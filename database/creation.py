from database.connection import Database


class DatabaseCreate(Database):

    def __create_baseuser(self):
        sql = """
        CREATE TABLE IF NOT EXISTS baseUser(
        userId INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL ,
        password TEXT NOT NULL,
        address TEXT NOT NULL,
        mobile TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        profilePiture TEXT
        )
        """
        self.create_table(sql)

    def __create_administrator(self):
        sql = """
        CREATE TABLE IF NOT EXISTS administrator(
        userId INTEGER PRIMARY KEY,
        isAdmin INTEGER DEFAULT 1,
        FOREIGN KEY (userId) REFERENCES baseUser(userId)
        )
        """
        self.create_table(sql)

    def __create_maintainer(self):
        sql = """
        CREATE TABLE IF NOT EXISTS maintainer(
        userId INTEGER PRIMARY KEY,
        isMaintainer INTEGER DEFAULT 1,
        FOREIGN KEY (userId) REFERENCES baseUser(userId)
        )
        """
        self.create_table(sql)

    def __create_user(self):
        sql = """
        CREATE TABLE IF NOT EXISTS user(
        userId INTEGER PRIMARY KEY,
        isUser INTEGER DEFAULT 1,
        FOREIGN KEY (userId) REFERENCES baseUser(userId)
        )
        """
        self.create_table(sql)

    def __create_advertisement(self):
        # rate duration 1 = day, 2=monthly, 3 = weekly
        sql = """
        CREATE TABLE IF NOT EXISTS advertisement(
        advertiseId INTEGER PRIMARY KEY AUTOINCREMENT,
        status INTEGER Default 1,
        title TEXT NOT NULL UNIQUE,
        rate INTEGER NOT NULL ,
        rateDuration INTEGER NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        description TEXT NOT NULL,
        phone INTEGER NOT NULL,
        districtId INTEGER NOT NULL,
        userId INTEGER,
        vehicleId INTEGER,
        mainImage TEXT,
        FOREIGN KEY (userId) REFERENCES user(userId) ON DELETE CASCADE,
        FOREIGN KEY (vehicleId) REFERENCES vehicle(vehicleId),
        FOREIGN KEY (districtId) REFERENCES districts(districtId)
        )
        """
        self.create_table(sql)

    def __create_advertise_discount(self):
        sql = """
        CREATE TABLE IF NOT EXISTS discount(
        discountId INTEGER PRIMARY KEY AUTOINCREMENT,
        percentage INTEGER NOT NULL ,
        status INTEGER default 1,
        startTime DATETIME NOT NULL,
        endTime DATETIME NOT NULL,
        advertiseId INTEGER NOT NULL,
        FOREIGN KEY (advertiseId) REFERENCES advertisement(advertiseId)
        )
        """
        self.create_table(sql)

    def __create_ad_statics(self):
        sql = """
        CREATE TABLE IF NOT EXISTS ad_statics(
        advertiseId INTEGER NOT NULL UNIQUE,
        clickCount INTEGER NOT NULL,
        spendTime INTEGER NOT NULL,
        FOREIGN KEY (advertiseId) REFERENCES advertisement(advertiseId)
        )
        """
        self.create_table(sql)

    def __create_review(self):
        sql = """
        CREATE TABLE IF NOT EXISTS review(
        reviewId INTEGER PRIMARY KEY AUTOINCREMENT,
        rating INTEGER NOT NULL ,
        description TEXT NOT NULL,
        userId INTEGER NOT NULL,
        adId INTEGER,
        FOREIGN KEY (userId) REFERENCES user(userId) ON DELETE CASCADE,
        FOREIGN KEY (adId) REFERENCES advertisement(advertiseId)
        )
        """
        self.create_table(sql)

    def __create_user_statics(self):
        sql = """
        CREATE TABLE IF NOT EXISTS userStat(
        advertiseId INTEGER,
        userId INTEGER,
        spendTime INTEGER,
        PRIMARY KEY (advertiseId, userId),
        FOREIGN KEY (userId) REFERENCES user(userId),
        FOREIGN KEY (advertiseId) REFERENCES advertisement(advertiseId)
        )
        """
        self.create_table(sql)

    def __create_brand(self):
        sql = """
        CREATE TABLE IF NOT EXISTS brand(
        brandId INTEGER PRIMARY KEY AUTOINCREMENT,
        brandName TEXT NOT NULL,
        vehicleType text NOT NULL,
        UNIQUE(brandName, vehicleType)
        )
        """
        self.create_table(sql)

    def __create_vehicle(self):
        # type = car, bus, truck, van,  bike
        sql = """
        CREATE TABLE IF NOT EXISTS vehicle(
        vehicleId INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT NOT NULL,
        transmissionMethod TEXT NOT NULL,
        withDriver INTEGER,
        withAc INTEGER,
        noOfPassengers INTEGER,
        maxWeight INTEGER,
        noOfSeats INTEGER,
        engineCapacity INTEGER,
        brandId INTEGER NOT NULL,
        FOREIGN KEY (brandId) REFERENCES vehicle(brandId)
        )
        """
        self.create_table(sql)

    def __create_insurance(self):
        sql = """
        CREATE TABLE IF NOT EXISTS insurance(
        insuranceId INTEGER PRIMARY KEY AUTOINCREMENT,
        insuranceType TEXT NOT NULL,
        collisonCoverage INTEGER NOT NULL,
        bodyCoverage INTEGER NOT NULL,
        medicalCoverage INTEGER NOT NULL,
        vehicleId INTEGER NOT NULL,
        FOREIGN KEY (vehicleId) REFERENCES vehicle(vehicleId)
        )
        """
        self.create_table(sql)

    def __create_reservation(self):
        sql = """
        CREATE TABLE IF NOT EXISTS reservation(
        reservationId INTEGER PRIMARY KEY ,
        reservationTime DATETIME DEFAULT CURRENT_TIMESTAMP,
        returnDate DATETIME,
        isCancelled INTEGER default 0,
        cancellationDetails TEXT,
        advertiseId INTEGER,
        userId INTEGER,
        FOREIGN KEY (advertiseId) REFERENCES advertisement(advertiseId),
        FOREIGN KEY (userId) REFERENCES user(userId)
        )
        """
        self.create_table(sql)

    def __create_reservation_discount(self):
        sql = """
        CREATE TABLE IF NOT EXISTS reservation_discount(
        discountId INTEGER PRIMARY KEY AUTOINCREMENT,
        discountPercentage INTEGER NOT NULL ,
        maxCap INTEGER
        )
        """
        self.create_table(sql)

    def __create_bill(self):
        sql = """
        CREATE TABLE IF NOT EXISTS bill(
        billId INTEGER PRIMARY KEY AUTOINCREMENT,
        status INTEGER default 1,
        payDate DATETIME,
        payAmount INTEGER,
        payingMethod TEXT
        )
        """
        self.create_table(sql)

    def __create_insurance_company(self):
        sql = """
        CREATE TABLE IF NOT EXISTS insuranceCompany(
        companyId INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE
        )
        """
        self.create_table(sql)

    def __create_districts(self):
        sql = """
        CREATE TABLE IF NOT EXISTS districts(
        districtId INTEGER PRIMARY KEY AUTOINCREMENT,
        district TEXT NOT NULL UNIQUE
        )
        """
        self.create_table(sql)

    def run(self):
        self.__create_baseuser()
        self.__create_administrator()
        self.__create_maintainer()
        self.__create_user()
        self.__create_advertisement()
        self.__create_advertise_discount()
        self.__create_ad_statics()
        self.__create_review()
        self.__create_user_statics()
        self.__create_brand()
        self.__create_vehicle()
        self.__create_insurance()
        self.__create_reservation()
        self.__create_reservation_discount()
        self.__create_bill()
        self.__create_insurance_company()
        self.__create_districts()
