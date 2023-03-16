import json

from flask import Flask, request, jsonify
from flask_cors import CORS
from flask.json import JSONEncoder
from database.creation import DatabaseCreate
from database.initial_data import InitialData
from database.mock_data import MockData
from flask_bcrypt import Bcrypt
from zipfile import ZipFile
import os, io, glob
from PIL import Image
from datetime import date


class CustomJSONEncoder(JSONEncoder):
    def default(self, obj):
        try:
            if isinstance(obj, date):
                return obj.isoformat()
            iterable = iter(obj)
        except TypeError:
            pass
        else:
            return list(iterable)
        return JSONEncoder.default(self, obj)


class DatabaseConfig(DatabaseCreate, InitialData, MockData):
    def delete_all_tables(self):
        sql = """
        SELECT name FROM sqlite_master WHERE type='table'
        """
        data = self.get_data(sql)
        for table in data:
            table = table[0]
            q = f"""DROP TABLE IF EXISTS {table}"""
            self.run_query(q)


db = DatabaseConfig()
db.run()
db.initial_run()
db.mock_run()

app = Flask(__name__, static_folder='static')
bcrypt = Bcrypt(app)
app.json_encoder = CustomJSONEncoder
app.config['UPLOAD_FOLDER'] = 'static'
app.config['AD_IMAGES'] = 'static/images'
app.config['ALLOWED_EXTENSIONS'] = set(['jpg', 'jpeg', 'png', 'gif'])
CORS(app)


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1] in app.config['ALLOWED_EXTENSIONS']


@app.route('/api/get/brand-names')
def get_brand_name_by_type():
    type = request.args.get('type')
    sql = f"""
    SELECT brandId, brandName, vehicleType 
    FROM brand WHERE vehicleType = "{type}"
    """
    raw_data = db.get_data(sql)
    data = [{"brandId": row[0], "brandName": row[1], "vehicleType": row[2]} for row in raw_data]

    return jsonify(data)


@app.route("/api/get/insurance-companies")
def get_insurance_companies():
    sql = f"""
        SELECT * 
        FROM insuranceCompany
        """
    raw_data = db.get_data(sql)
    data = [{"companyId": row[0], "name": row[1]} for row in raw_data]
    return jsonify(data)


@app.route("/api/get/districts")
def get_districts():
    sql = """
    SELECT * FROM districts
    """
    raw_data = db.get_data(sql)
    data = [{"value": row[0], "viewValue": row[1]} for row in raw_data]
    return jsonify(data), 200


@app.route("/api/get/ad-count")
def get_ad_count():
    sql = """
    SELECT type, COUNT(*) AS count
    FROM vehicle
    WHERE type IN ('car', 'bus','lorry','van','bike')
    GROUP BY type;
    """
    raw_data = db.get_data(sql)
    data = {
        'car': 0,
        'bus': 0,
        'lorry': 0,
        'van': 0,
        'bike': 0
    }
    for item in raw_data:
        data[item[0]] = item[1]

    return jsonify(data), 200


@app.route("/api/get/user/<int:user_id>")
def get_user_data(user_id):
    sql = """
    SELECT b.username, b.address, b.mobile, b.email FROM baseUser b 
    JOIN user u ON b.userId = u.userId 
    WHERE b.userId = '{}' AND u.isUser = 1
    """
    try:
        raw_data = db.get_data(sql.format(user_id))[0]
    except IndexError:
        return jsonify({
            "success": False,
            "message": "User Not Available"
        }), 404
    return jsonify({
        'username': raw_data[0],
        'address': raw_data[1],
        'mobile': raw_data[2],
        'email': raw_data[3]
    }), 200


@app.route("/api/get/ads/<int:user_id>")
def get_user_ads(user_id):
    sql_advertisement = f"""
    SELECT advertiseId,title,rate,rateDuration,mainImage,userId from advertisement 
    WHERE userId = '{user_id}'
    """
    raw_advertisements = db.get_data(sql_advertisement)
    sql_user = f"""
    SELECT b.username FROM baseUser b 
    JOIN user u ON b.userId = u.userId 
    WHERE b.userId = '{user_id}' AND u.isUser = 1
    """
    try:
        raw_user_data = db.get_data(sql_user)[0]
    except IndexError:
        return jsonify({
            "success": False,
            "message": "User Not Available"
        }), 404
    data = [
        {
            "username": raw_user_data[0],
            "user_id": user_id,
            "profile_picture": 'http://localhost:' + request.environ.get(
                'SERVER_PORT') + '/static/profilePictures/propic.png',
            "title": row[1],
            "ad_image": 'http://localhost:' + request.environ.get(
                'SERVER_PORT') + '/'.join(['/static', 'images', str(row[0]), 'image0.jpg']),
            "rate": row[2],
            "duration": row[3],
            "ad_id": row[0]
        }
        for row in raw_advertisements
    ]
    if data == []:
        return jsonify({
            "success": False,
            "message": "No ads Available"
        }), 404
    return jsonify(data)


@app.route("/api/register", methods=["POST"])
def register():
    data = request.get_json()
    role = data.get('role')
    username = data.get('username')
    mobile = data.get('mobile')
    address = data.get('address')
    email = data.get('email')
    password = data.get('password')
    if (not role or not username or not mobile or not address or not email or not password):
        return jsonify({'error': 'Missing required fields'}), 400
    sql_find_user_exist = """
    select * from {} JOIN baseUser on baseUser.userId = user.userId where email = '{}'
    """
    user_data = db.get_data(sql_find_user_exist.format(role, email))
    if len(user_data) != 0:
        return jsonify({'error': 'User Aleady Exist'}), 409
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    sql = f"""
    INSERT INTO baseUser(username, mobile, address, email, password)
    VALUES("{username}","{mobile}", "{address}","{email}","{hashed_password}")
    """
    db.run_query(sql)
    last_row_id = db.get_last_row_id()
    sql = """
    INSERT INTO {}(userId) VALUES({})
    """
    if (role == 'user'):
        sql = sql.format('user', last_row_id)
        db.run_query(sql)
        return jsonify({
            "success": True,
            "message": "Account Create Success"
        }), 200


@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    role = data.get('role')
    email = data.get('email')
    password = data.get('password')
    if (not role or not email or not password):
        return jsonify({'error': 'Missing required fields'}), 400
    sql = """
    SELECT b.password, b.userId, b.username FROM baseUser b 
    JOIN {} u ON b.userId = u.userId 
    WHERE b.email = '{}' AND u.isUser = 1
    """
    if role == 'user':
        raw_data = db.get_data(sql.format(role, email))
        hashed_password = raw_data[0][0]
        userId = raw_data[0][1]
        username = raw_data[0][2]
        is_match_password = bcrypt.check_password_hash(hashed_password, str(password))
        if is_match_password:
            return jsonify({
                "success": True,
                "message": "Login Success",
                "user": {
                    "userId": userId,
                    "userName": username
                }
            }), 200
        else:
            return jsonify({
                "success": False,
                "message": "Login failure"
            }), 401


@app.route('/api/post-ad', methods=['POST'])
def post_ad():
    vehicle_form = request.files['vehicle']
    insurance_form = request.files['insurance']
    details_form = request.files['details']
    file = request.files['files']
    if (not vehicle_form or not insurance_form or not details_form):
        return jsonify({'error': 'Missing required fields'}), 400
    vehicle_form_content = json.loads(vehicle_form.read())
    insurance_form_content = json.loads(insurance_form.read())
    details_form_content = json.loads(details_form.read())
    type = vehicle_form_content['type']
    transmissionMethod = vehicle_form_content['transmission']
    brandId = vehicle_form_content['brand']
    phone = details_form_content['phone']
    district = details_form_content['district']
    if (vehicle_form_content['type'] == 'car'):
        withDriver = details_form_content['driver']
        withAc = details_form_content['ac']
        noOfPassengers = details_form_content['passengers']
        vehicle_sql = f"""
        INSERT INTO vehicle(type,transmissionMethod,withDriver,withAc,noOfPassengers,brandId) VALUES(
        '{type}','{transmissionMethod}','{withDriver}','{withAc}','{noOfPassengers}','{brandId}'
        )
        """
        db.run_query(vehicle_sql)
    elif vehicle_form_content['type'] == 'bike':
        print(details_form_content)
        engineCapacity = details_form_content['enginecapacity']
        vehicle_sql = f"""
                INSERT INTO vehicle(type,transmissionMethod,engineCapacity,brandId) VALUES(
                '{type}','{transmissionMethod}','{engineCapacity}','{brandId}'
                )
                """
        db.run_query(vehicle_sql)
    elif vehicle_form_content['type'] == 'lorry':
        withDriver = details_form_content['driver']
        maxWeight = details_form_content['weight']
        vehicle_sql = f"""
            INSERT INTO vehicle(type,transmissionMethod,withDriver,maxWeight,brandId) VALUES(
            '{type}','{transmissionMethod}','{withDriver}','{maxWeight}','{brandId}'
            )
            """
        db.run_query(vehicle_sql)
    elif vehicle_form_content['type'] == 'bus':
        withDriver = details_form_content['driver']
        withAc = details_form_content['ac']
        seats = details_form_content['seats']
        vehicle_sql = f"""
            INSERT INTO vehicle(type,transmissionMethod,withDriver,withAc,noOfSeats,brandId) VALUES(
            '{type}','{transmissionMethod}','{withDriver}','{withAc}','{seats}','{brandId}'
            )
            """
        db.run_query(vehicle_sql)
    elif vehicle_form_content['type'] == 'van':
        withDriver = details_form_content['driver']
        withAc = details_form_content['ac']
        noOfPassengers = details_form_content['passengers']
        vehicle_sql = f"""
            INSERT INTO vehicle(type,transmissionMethod,withDriver,withAc,noOfPassengers,brandId) VALUES(
            '{type}','{transmissionMethod}','{withDriver}','{withAc}','{noOfPassengers}','{brandId}'
            )
            """
        db.run_query(vehicle_sql)
    else:
        return jsonify({
            "success": False,
            "message": "Not Valid Vehicle Type"
        }), 404

    vehicleId = db.get_last_row_id()
    title = details_form_content['title']
    rate = details_form_content['rate']
    duration = details_form_content['duration']
    description = details_form_content['description']
    userId = details_form_content['userId']
    sql = f"""
    INSERT INTO advertisement(title,rate,rateDuration,description,userId,vehicleId,mainImage,phone,district) VALUES(
    '{title}','{rate}','{duration}','{description}','{userId}','{vehicleId}','image0.jpg','{phone}','{district}')    
    """
    db.run_query(sql)
    insuranceType = insurance_form_content['insuranceType']
    collisonCoverage = insurance_form_content['collisonCoverage']
    bodyCoverage = insurance_form_content['bodyCoverage']
    medicalCoverage = insurance_form_content['medicalCoverage']
    insurance_sql = f"""
    INSERT INTO insurance(insuranceType,collisonCoverage,bodyCoverage,medicalCoverage,vehicleId) VALUES(
    '{insuranceType}','{collisonCoverage}','{bodyCoverage}','{medicalCoverage}','{vehicleId}'
    )
    """
    db.run_query(insurance_sql)
    temp_dir = os.path.join(os.getcwd(), app.config['AD_IMAGES'], str(vehicleId))
    if not os.path.exists(temp_dir):
        os.makedirs(temp_dir)
    # with ZipFile(file, 'r') as zip_ref:
    #     zip_ref.extractall(temp_dir)
    with ZipFile(file, 'r') as zip_ref:
        for name in zip_ref.namelist():
            if name.endswith('.jpg') or name.endswith('.png'):
                # Open the image file with Pillow
                with zip_ref.open(name) as image_file:
                    image_bytes = io.BytesIO(image_file.read())
                    image = Image.open(image_bytes)

                    # Resize the image to a default size
                    default_size = (750, 600)
                    image.thumbnail(default_size)

                    # Save the resized image to a new file
                    filename = os.path.join(temp_dir, name)
                    image.save(filename)
    return jsonify({
        "success": True,
        "message": "Post-ad Success"
    }), 200


@app.route('/api/get/ad-details/<int:ad_id>')
def get_adverisement_details(ad_id):
    sql = f"""
    SELECT ad.status,ad.title,ad.rate,ad.rateDuration,ad.createdAt,ad.description,ad.userId,ad.vehicleId,ad.phone, districts.district 
    FROM advertisement ad
    JOIN districts ON ad.district = districts.districtId  
    WHERE ad.advertiseId='{ad_id}'
    """
    try:
        raw_data = db.get_data(sql)[0]
    except IndexError:
        return jsonify({
            "success": False,
            "message": "Advertisement not available"
        }), 404
    if raw_data[0] != 1:
        return jsonify({
            "success": False,
            "message": "Advertise Inactive"
        }), 404
    dir_path = os.path.join(os.getcwd(), app.config['AD_IMAGES'], str(ad_id))
    if os.path.exists(dir_path):
        # Get a list of all image files in the directory
        image_files = glob.glob(os.path.join(dir_path, '*.jpg')) + glob.glob(
            os.path.join(dir_path, '*.jpeg')) + glob.glob(os.path.join(dir_path, '*.png'))

        image_files = ['/'.join([''.join(['http://localhost:', request.environ.get(
            'SERVER_PORT')]), app.config['AD_IMAGES'], str(ad_id), os.path.basename(file)]) for file in image_files]

    else:
        return jsonify({
            "success": False,
            "message": "Advertise Images Path Not available"
        }), 404

    data = {
        "adId": ad_id,
        "title": raw_data[1],
        "rate": raw_data[2],
        "rateDuration": raw_data[3],
        "createdAt": raw_data[4],
        "description": raw_data[5],
        "userId": raw_data[6],
        "vehicleId": raw_data[7],
        "phone": raw_data[8],
        "district": raw_data[9],
        "images": image_files
    }
    return jsonify(data)


@app.route('/api/get/search')
def get_search_results():
    query = request.args.get('search')
    search_sql = f"""
    SELECT advertiseId,title,rate,rateDuration,mainImage,userId from advertisement 
    WHERE title LIKE '%{query}%'
    OR description LIKE '%{query}%'
    ORDER BY createdAt DESC;
    """
    raw_advertisements = db.get_data(search_sql)
    sql_user = """
        SELECT b.username FROM baseUser b 
        JOIN user u ON b.userId = u.userId 
        WHERE b.userId = '{}' AND u.isUser = 1
        """
    data = []
    for row in raw_advertisements:
        userId = row[5]
        try:
            raw_user_data = db.get_data(sql_user.format(userId))[0]
        except IndexError:
            continue
        ad_data = {
            "username": raw_user_data[0],
            "user_id": userId,
            "profile_picture": 'http://localhost:' + request.environ.get(
                'SERVER_PORT') + '/static/profilePictures/propic.png',
            "title": row[1],
            "ad_image": 'http://localhost:' + request.environ.get(
                'SERVER_PORT') + '/'.join(['/static', 'images', str(row[0]), 'image0.jpg']),
            "rate": row[2],
            "duration": row[3],
            "ad_id": row[0]
        }
        data.append(ad_data)
    print(data)
    return jsonify(data), 200


if __name__ == '__main__':
    app.run()
    pass
