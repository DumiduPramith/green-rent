import json

from flask import Flask, request, jsonify
from flask_cors import CORS
from database.creation import DatabaseCreate
from database.initial_data import InitialData
from flask_bcrypt import Bcrypt
from zipfile import ZipFile
import os
from io import BytesIO
import io


class DatabaseConfig(DatabaseCreate, InitialData):
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

app = Flask(__name__)
bcrypt = Bcrypt(app)
app.config['UPLOAD_FOLDER'] = 'static'
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
    if (vehicle_form_content['type'] == 'car'):
        type = vehicle_form_content['type']
        transmissionMethod = vehicle_form_content['transmission']
        withDriver = details_form_content['driver']
        withAc = details_form_content['ac']
        noOfPassengers = details_form_content['passengers']
        brandId = vehicle_form_content['brand']
        vehicle_sql = f"""
        INSERT INTO vehicle(type,transmissionMethod,withDriver,withAc,noOfPassengers,brandId) VALUES(
        '{type}','{transmissionMethod}','{withDriver}','{withAc}','{noOfPassengers}','{brandId}'
        )
        """
        db.run_query(vehicle_sql)
    vehicleId = db.get_last_row_id()
    title = details_form_content['title']
    rate = details_form_content['rate']
    duration = details_form_content['duration']
    description = details_form_content['description']
    userId = details_form_content['userId']
    sql = f"""
    INSERT INTO advertisement(title,rate,rateDuration,description,userId,vehicleId) VALUES(
    '{title}','{rate}','{duration}','{description}','{userId}','{vehicleId}')    
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
    temp_dir = os.path.join(os.getcwd(), 'static', 'images', str(vehicleId))
    if not os.path.exists(temp_dir):
        os.makedirs(temp_dir)
    with ZipFile(file, 'r') as zip_ref:
        zip_ref.extractall(temp_dir)
    return jsonify({
        "success": True,
        "message": "Post-ad Success"
    }), 200


if __name__ == '__main__':
    app.run()
    pass
