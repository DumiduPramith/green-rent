from database.connection import Database
from flask_bcrypt import Bcrypt

USER = [{"role": 'user', "username": "dumidu", "mobile": "789620635", "address": "withikuliya",
         "email": "dumidu42@gmail.com", "password": "$2a$10$BjxltLCOD2Ybm2aNEa2y7uji1lcwU61X7lOH0FOs6WUYd4WlIvgUa"}]

ADS = [{}]


class MockData(Database):
    def __mock_user(self):
        for user in USER:
            username = user['username']
            mobile = user['mobile']
            address = user['address']
            email = user['email']
            hashed_password = user['password']
            role = user['role']

        sql = f"""
            INSERT INTO baseUser(username, mobile, address, email, password)
            VALUES("{username}","{mobile}", "{address}","{email}","{hashed_password}")
            """
        self.run_query(sql)
        last_row_id = self.get_last_row_id()
        sql = """
            INSERT INTO {}(userId) VALUES({})
            """
        if (role == 'user'):
            sql = sql.format('user', last_row_id)
            self.run_query(sql)

    def __mock_advertisement(self):
        pass

    def mock_run(self):
        self.__mock_user()
