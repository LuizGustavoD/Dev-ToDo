from flask import Blueprint, request, jsonify, session
from .models import db, User
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

auth_bp = Blueprint('auth', __name__)



@auth_bp.route('/auth', methods=['GET'])
def verify_auth():
    if 'user_id' in session and 'username' in session:
        user = User.query.get(session['user_id'])
        if user and user.username == session['username']:
            return jsonify({'message': 'User is authenticated', 'username': user.username}), 200
    return jsonify({'message': 'User is not authenticated'}), 401

@auth_bp.route('/auth', methods=['POST'])
def auth():
    data = request.get_json()
    action = data.get('action')
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Username and password are required'}), 400

    if action == 'login':
        user = User.query.filter_by(username=username).first()
        if user and check_password_hash(user.password, password):
            session['user_id'] = user.id
            session['username'] = user.username
            return jsonify({'message': 'Login successful'}), 200
        return jsonify({'message': 'Invalid credentials'}), 401

    elif action == 'register':
        if User.query.filter_by(username=username).first():
            return jsonify({'message': 'Username already exists'}), 400
        hashed_password = generate_password_hash(password)
        new_user = User(username=username, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        session['user_id'] = new_user.id
        session['username'] = new_user.username
        return jsonify({'message': 'User registered successfully'}), 201
#
    return jsonify({'message': 'Invalid action'}), 400
