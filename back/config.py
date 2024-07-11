import os

class Config:
    MONGO_URI = f"mongodb://{os.environ.get('MONGODB_USERNAME')}:{os.environ.get('MONGODB_PASSWORD')}@{os.environ.get('MONGODB_HOSTNAME')}:27017/{os.environ.get('MONGODB_DATABASE')}"
    MONGO_DBNAME = os.environ.get('MONGODB_DATABASE')

app_config = Config()
