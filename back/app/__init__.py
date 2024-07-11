from flask import Flask
from pymongo import MongoClient

app = Flask(__name__)
app.config.from_object('config')

client = MongoClient(app.config['MONGO_URI'])
db = client[app.config['MONGO_DBNAME']]

from app import routes
