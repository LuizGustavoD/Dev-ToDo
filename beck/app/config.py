import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    def __init__(self):
        database_url = os.getenv('DATABASE_URL')
        if database_url and database_url.startswith("postgresql://"):
            self.SQLALCHEMY_DATABASE_URI = database_url.replace("postgresql://", "postgresql+psycopg2://")
        else:
            self.SQLALCHEMY_DATABASE_URI = database_url

        self.SQLALCHEMY_TRACK_MODIFICATIONS = False
        self.SECRET_KEY = os.getenv('SECRET_KEY', 'default-secret-key')
