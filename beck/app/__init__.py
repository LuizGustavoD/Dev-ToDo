from flask import Flask
from .extensions import db, jwt
from .config import Config

# Inicializa o aplicativo Flask, e registra as extensões e blueprints
def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Inicializa extensões
    db.init_app(app)
    jwt.init_app(app)
    
    # Registra blueprints
    from .auth.routes import auth_bp
    from .todos.routes import todos_bp
    
    app.register_blueprint(auth_bp)
    app.register_blueprint(todos_bp, url_prefix='/api')
    
    return app