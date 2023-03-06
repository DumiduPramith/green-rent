import os
import sqlite3

from settings import *

class Database:
    def __init__(self):
        try:
            filename = DATABASE_NAME
        except:
            filename = 'test'
        self.__connection = sqlite3.connect(os.path.join(os.path.dirname(__file__), filename+".db"),
                                            check_same_thread=False,
                                            detect_types=sqlite3.PARSE_DECLTYPES | sqlite3.PARSE_COLNAMES
                                            )
        self.__c = self.__connection.cursor()
        print("Database Connection Success")

    def __del__(self):
        try:
            self.__c.close()
        except Exception as ex:
            template = "An exception of type {0} occurred. Arguments:\n{1!r} Database"
            message = template.format(type(ex).__name__, ex.args)
            print(message)
            # print("Database Connection close exception")

    def run_query(self, query):
        #  Only accept single query
        # print(query)
        try:
            self.__c.execute(query)
            self.__connection.commit()
        except sqlite3.Error as error:
            print("An error occurred", error)
            print(query)

    def run_query_script(self, query):
        #  Run for many sql statements.
        self.__c.executescript(query)
        self.__connection.commit()

    def create_table(self, query):
        self.run_query(query)
        self.__connection.commit()

    def get_data(self, query):
        self.run_query(query)
        raw_data = self.__c.fetchall()
        return raw_data
