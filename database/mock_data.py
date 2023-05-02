from database.connection import Database
from database.mock_advertisement.mock_car import CAR
from database.mock_advertisement.mock_bike import BIKE
from database.mock_advertisement.mock_lorry import LORRY
import os

USER = [{"role": 'user', "username": "dumidu", "mobile": "789620635", "address": "withikuliya",
         "email": "dumidu42@gmail.com", "password": "$2a$10$BjxltLCOD2Ybm2aNEa2y7uji1lcwU61X7lOH0FOs6WUYd4WlIvgUa"}]


class MockData(Database):
    def __init__(self):
        super().__init__()
        self.userId = 1

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

    def __mock_car_advertisement(self):
        data = CAR
        vehicle_sql = """
                INSERT INTO vehicle(type,transmissionMethod,withDriver,withAc,noOfPassengers,brandId) VALUES(
                '{}','{}','{}','{}','{}','{}'
                )
                """
        advertisement_sql = """
            INSERT INTO advertisement(title,rate,rateDuration,description,userId,vehicleId,mainImage,phone,districtId) VALUES(
            '{}','{}','{}','{}','{}','{}','image0.jpg','{}','{}')    
            """
        insurance_sql = """
            INSERT INTO insurance(insuranceType,collisonCoverage,bodyCoverage,medicalCoverage,vehicleId) VALUES(
            '{}','{}','{}','{}','{}'
            )
            """

        for item in data:
            vehicle = item['vehicle']
            advertisement = item['advertisement']
            insurance = item['insurance']
            try:
                self.execute('BEGIN')
                vehicle_query = vehicle_sql.format(vehicle['type'], vehicle['transmissionMethod'],
                                                   vehicle['withDriver'],
                                                   vehicle['withAc'], vehicle['noOfPassengers'], vehicle['brandId'])
                self.execute(vehicle_query)
                vehicleId = self.get_last_row_id()
                advertisement_query = advertisement_sql.format(advertisement['title'], advertisement['rate'],
                                                               advertisement['rateDuration'],
                                                               advertisement['description'],
                                                               self.userId, vehicleId,
                                                               advertisement['phone'], advertisement['districtId'])
                self.execute(advertisement_query)
                advertisementId = self.get_last_row_id()
                insurance_query = insurance_sql.format(insurance['insuranceType'], insurance['collisonCoverage'],
                                                       insurance['bodyCoverage'], insurance['medicalCoverage'],
                                                       vehicleId)
                self.execute(insurance_query)
                self.commit()
            except:
                self.rollback()

    def __mock_bike_advertisement(self):
        data = BIKE
        vehicle_sql = """
                        INSERT INTO vehicle(type,transmissionMethod,engineCapacity,brandId) VALUES(
                        '{}','{}','{}','{}'
                        )
                        """
        advertisement_sql = """
                    INSERT INTO advertisement(title,rate,rateDuration,description,userId,vehicleId,mainImage,phone,districtId) VALUES(
                    '{}','{}','{}','{}','{}','{}','image0.jpg','{}','{}')    
                    """
        insurance_sql = """
                    INSERT INTO insurance(insuranceType,collisonCoverage,bodyCoverage,medicalCoverage,vehicleId) VALUES(
                    '{}','{}','{}','{}','{}'
                    )
                    """
        for item in data:
            vehicle = item['vehicle']
            advertisement = item['advertisement']
            insurance = item['insurance']
            try:
                self.execute('BEGIN')
                vehicle_query = vehicle_sql.format(vehicle['type'], vehicle['transmissionMethod'],
                                                   vehicle['engineCapacity'], vehicle['brandId'])
                self.execute(vehicle_query)
                vehicleId = self.get_last_row_id()
                advertisement_query = advertisement_sql.format(advertisement['title'], advertisement['rate'],
                                                               advertisement['rateDuration'],
                                                               advertisement['description'],
                                                               self.userId, vehicleId,
                                                               advertisement['phone'], advertisement['districtId'])
                self.execute(advertisement_query)
                advertisementId = self.get_last_row_id()
                insurance_query = insurance_sql.format(insurance['insuranceType'], insurance['collisonCoverage'],
                                                       insurance['bodyCoverage'], insurance['medicalCoverage'],
                                                       vehicleId)
                self.execute(insurance_query)
                self.commit()
            except:
                self.rollback()

    def __mock_lorry_advertisement(self):
        data = LORRY
        vehicle_sql = """
                                INSERT INTO vehicle(type,transmissionMethod,engineCapacity,brandId) VALUES(
                                '{}','{}','{}','{}'
                                )
                                """
        advertisement_sql = """
                            INSERT INTO advertisement(title,rate,rateDuration,description,userId,vehicleId,mainImage,phone,districtId) VALUES(
                            '{}','{}','{}','{}','{}','{}','image0.jpg','{}','{}')    
                            """
        insurance_sql = """
                            INSERT INTO insurance(insuranceType,collisonCoverage,bodyCoverage,medicalCoverage,vehicleId) VALUES(
                            '{}','{}','{}','{}','{}'
                            )
                            """
        for item in data:
            vehicle = item['vehicle']
            advertisement = item['advertisement']
            insurance = item['insurance']
            try:
                self.execute('BEGIN')
                vehicle_query = vehicle_sql.format(vehicle['type'], vehicle['transmissionMethod'],
                                                   vehicle['engineCapacity'], vehicle['brandId'])
                self.execute(vehicle_query)
                vehicleId = self.get_last_row_id()
                advertisement_query = advertisement_sql.format(advertisement['title'], advertisement['rate'],
                                                               advertisement['rateDuration'],
                                                               advertisement['description'],
                                                               self.userId, vehicleId,
                                                               advertisement['phone'], advertisement['districtId'])
                self.execute(advertisement_query)
                advertisementId = self.get_last_row_id()
                insurance_query = insurance_sql.format(insurance['insuranceType'], insurance['collisonCoverage'],
                                                       insurance['bodyCoverage'], insurance['medicalCoverage'],
                                                       vehicleId)
                self.execute(insurance_query)
                self.commit()
            except:
                self.rollback()

    def mock_run(self):
        self.__mock_user()
        self.__mock_car_advertisement()
        self.__mock_bike_advertisement()
        self.__mock_lorry_advertisement()
