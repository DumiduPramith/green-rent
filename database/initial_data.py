from database.connection import Database
from database.brand import CAR, TRUCK, BUS, VAN, BIKE
from database.insurance_company import COMPANIES
from database.districts import DISTRICTS


class InitialData(Database):
    def __initial_brand(self):
        sql = """
        INSERT INTO brand(brandName, vehicleType) VALUES ("{}","{}")
        """
        for vehicle in CAR:
            tmp = sql.format(vehicle['name'], vehicle['type'])
            self.run_query(tmp)

        for vehicle in TRUCK:
            tmp = sql.format(vehicle['name'], vehicle['type'])
            self.run_query(tmp)

        for vehicle in BUS:
            tmp = sql.format(vehicle['name'], vehicle['type'])
            self.run_query(tmp)

        for vehicle in VAN:
            tmp = sql.format(vehicle['name'], vehicle['type'])
            self.run_query(tmp)

        for vehicle in BIKE:
            tmp = sql.format(vehicle['name'], vehicle['type'])
            self.run_query(tmp)

    def __initial_insurance_companies(self):
        sql = """
                INSERT INTO insuranceCompany(name) VALUES ("{}")
                """
        for company in COMPANIES:
            tmp = sql.format(company['name'])
            self.run_query(tmp)

    def __initial_districts(self):
        sql = """
        INSERT INTO districts(district) VALUES ("{}")
        """
        for district in DISTRICTS:
            tmp = sql.format(district)
            self.run_query(tmp)

    def __initial_user(self):
        pass

    def initial_run(self):
        self.__initial_brand()
        self.__initial_insurance_companies()
        self.__initial_districts()
