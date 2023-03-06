from connection import Database


class DatabaseConfig(Database):

    def create_baseuser(self):
        sql = """
        CREATE TABLE IF NOT EXISTS baseUser(
        userId INTEGER PRIMARY KEY AUTOINCREMENT,
        first TEXT NOT NULL ,
        last TEXT,
        password TEXT NOT NULL,
        address TEXT NOT NULL,
        nationalId INTEGER NOT NULL UNIQUE
        )
        """
        self.create_table(sql)

    def create_administrator(self):
        sql = """
        CREATE TABLE IF NOT EXISTS administrator(
        userId INTEGER PRIMARY KEY,
        isAdmin INTEGER DEFAULT 1,
        FOREIGN KEY (userId) REFERENCES baseUser(userId)
        )
        """
        self.create_table(sql)

    def create_maintainer(self):
        sql = """
        CREATE TABLE IF NOT EXISTS maintainer(
        userId INTEGER PRIMARY KEY,
        isMaintainer INTEGER DEFAULT 1,
        FOREIGN KEY (userId) REFERENCES baseUser(userId)
        )
        """
        self.create_table(sql)

    def create_user(self):
        sql = """
        CREATE TABLE IF NOT EXISTS user(
        userId INTEGER PRIMARY KEY,
        isUser INTEGER DEFAULT 1,
        FOREIGN KEY (userId) REFERENCES baseUser(userId)
        )
        """
        self.create_table(sql)

    def create_advertisement(self):
        # rate duration 1 = day, 2=monthly, 3 = weekly
        sql = """
        CREATE TABLE IF NOT EXISTS advertisement(
        advertiseId INTEGER PRIMARY KEY AUTOINCREMENT,
        status INTEGER Default 1,
        title TEXT NOT NULL ,
        rate INTEGER NOT NULL ,
        rateDuration INTEGER NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        description TEXT NOT NULL
        )
        """
        self.create_table(sql)

    def create_images(self):
        sql = """
        CREATE TABLE IF NOT EXISTS images (
        imgId INTEGER PRIMARY KEY AUTOINCREMENT,
        location TEXT NOT NULL
        )
        """
        self.create_table(sql)

    def create_advertise_image(self):
        sql = """
        CREATE TABLE IF NOT EXISTS advertise_image(
        adId INTEGER,
        imgId INTEGER,
        PRIMARY KEY (adId, imgId),
        FOREIGN KEY (adId) REFERENCES advertisement(adId),
        FOREIGN KEY (imgId) REFERENCES images(imgId)
        )
        """
        self.create_table(sql)

    def create_advertise_discount(self):
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

    def create_ad_statics(self):
        sql = """
        CREATE TABLE IF NOT EXISTS ad_statics(
        advertiseId INTEGER NOT NULL UNIQUE,
        clickCount INTEGER NOT NULL,
        spendTime INTEGER NOT NULL,
        FOREIGN KEY (advertiseId) REFERENCES advertisement(advertiseId)
        )
        """
        self.create_table(sql)

    def create_review(self):
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

    def create_user_statics(self):
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

    def create_brand(self):
        sql = """
        CREATE TABLE IF NOT EXISTS brand(
        brandId INTEGER PRIMARY KEY AUTOINCREMENT,
        brandName TEXT NOT NULL
        )
        """
        self.create_table(sql)

    def create_vehicle(self):
        # type = car, bus, truck, van,  bike
        sql = """
        CREATE TABLE IF NOT EXISTS vehicle(
        vehicleId INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT NOT NULL,
        modelNumber TEXT NOT NULL,
        transmissionMethod TEXT NOT NULL,
        withDriver INTEGER NOT NULL,
        withAc INTEGER NOT NULL,
        noOfPassenger INTEGER NOT NULL,
        maxWeight INTEGER NOT NULL,
        noOfSeats INTEGER NOT NULL,
        engineCapacity INTEGER NOT NULL,
        brandId INTEGER NOT NULL,
        FOREIGN KEY (brandId) REFERENCES vehicle(brandId)
        )
        """
        self.create_table(sql)

    def create_insurance(self):
        sql = """
        CREATE TABLE IF NOT EXISTS insurance(
        insuranceId INTEGER PRIMARY KEY AUTOINCREMENT,
        insurance_type TEXT NOT NULL,
        collison_coverage INTEGER NOT NULL,
        body_coverage INTEGER NOT NULL,
        medical_coverage INTEGER NOT NULL,
        vehicleId INTEGER NOT NULL,
        FOREIGN KEY (vehicleId) REFERENCES vehicle(vehicleId)
        )
        """
        self.create_table(sql)

    def create_reservation(self):
        sql = """
        CREATE TABLE IF NOT EXISTS reservation(
        reservationId INTEGER PRIMARY KEY ,
        reservationTime DATETIME DEFAULT CURRENT_TIMESTAMP,
        returnDate DATETIME,
        isCancelled INTEGER default 0,
        cancellationDetails TEXT,
        advertiseId INTEGER,
        FOREIGN KEY (advertiseId) REFERENCES advertisement(advertiseId)
        )
        """
        self.create_table(sql)

    def create_reservation_discount(self):
        sql = """
        CREATE TABLE IF NOT EXISTS reservation_discount(
        discountId INTEGER PRIMARY KEY AUTOINCREMENT,
        discountPercentage INTEGER NOT NULL ,
        maxCap INTEGER
        )
        """
        self.create_table(sql)

    def create_bill(self):
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

    def run(self):
        self.create_baseuser()
        self.create_administrator()
        self.create_maintainer()
        self.create_user()
        self.create_advertisement()
        self.create_images()
        self.create_advertise_image()
        self.create_advertise_discount()
        self.create_ad_statics()
        self.create_review()
        self.create_user_statics()
        self.create_brand()
        self.create_vehicle()
        self.create_insurance()
        self.create_reservation()
        self.create_reservation_discount()
        self.create_bill()


db = DatabaseConfig()
        