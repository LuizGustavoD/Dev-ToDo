from flask import Flask
from flask_cors import CORS
from .extensions import db, jwt
from .config import Config
from flask_migrate import Migrate  # Adicione esta linha

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config())

    CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})


    # Inicializa as extensões
    db.init_app(app)
    jwt.init_app(app)
    Migrate(app, db)  # Adicione esta linha
    
    # Registra blueprints
    from .auth.routes import auth_bp
    from .todos.routes import todo_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api')
    app.register_blueprint(todo_bp, url_prefix='/api')

    return app