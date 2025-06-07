from flask import Blueprint, request, jsonify
from .models import db, Todo
from flask_cors import CORS

todo_bp = Blueprint('todos', __name__)


@todo_bp.route('/todos', methods=['GET', 'POST', 'OPTIONS', 'DELETE'])
def handle_todos():
    if request.method == 'OPTIONS':
        response = jsonify({'message': 'OK'})
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        return response
    
    if request.method == 'GET':
        return get_todos()
    elif request.method == 'POST':
        return create_todo()
    elif request.method == 'DELETE':
        title = request.args.get('title')
        if not title:
            return jsonify({'error': 'O campo "title" é obrigatório'}), 400
        return delete_todo(title)

@todo_bp.route('/stats/user', methods=['GET'])
def get_user_stats():
    counter = 0
    todos = Todo.query.all()
    for todo in todos:
        if todo.completed:
            counter += 1
    return jsonify({'tasksCompleted': counter}), 200

def get_todos(user):
    todos = Todo.query.filter_by(user=user).all()
    return jsonify([todo.to_dict() for todo in todos]), 200

def create_todo():
    try:
        data = request.get_json()
        if not data or 'title' not in data:
            return jsonify({'error': 'O campo "title" é obrigatório'}), 400
        
        new_todo = Todo(
            title=data['title'],
            description=data.get('description'),
            due_date=None,   # Se quiser implementar depois, pode converter data aqui
            completed=data.get('completed', False),
            user=data.get('user', 'default_user')  # Use a lógica de autenticação para obter o usuário
        )

        db.session.add(new_todo)
        db.session.commit()
        return jsonify(new_todo.to_dict()), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

def delete_todo(title, user):
    todo = Todo.query.filter_by(title=title, user=user).first()
    if not todo:
        return jsonify({'error': 'Todo not found'}), 404
    db.session.delete(todo)
    db.session.commit()
    return jsonify({'message': 'Todo deleted successfully'}), 200