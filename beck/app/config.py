import os

# Pseudoconfiguration for a Flask application
class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'segredo-muito-secreto')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///todos.db')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'segredo-jwt')