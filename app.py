from flask import Flask
from database.creation import DatabaseConfig

app = Flask(__name__)
db = DatabaseConfig()


@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'


if __name__ == '__main__':
    app.run()
