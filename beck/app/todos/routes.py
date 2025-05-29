from flask import Blueprint, request, jsonify
from .models import db, Todo
from flask_cors import CORS

todo_bp = Blueprint('todos', __name__)
CORS(todo_bp)

@todo_bp.route('/todos', methods=['GET', 'POST', 'OPTIONS'])
def handle_todos():
    if request.method == 'OPTIONS':
        # Resposta para preflight request
        response = jsonify({'message': 'OK'})
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        return response
    
    if request.method == 'GET':
        return get_todos()
    elif request.method == 'POST':
        return create_todo()

def get_todos():
    """Retorna todas as tarefas"""
    todos = Todo.query.all()
    return jsonify([todo.to_dict() for todo in todos]), 200

def create_todo():
    """Cria uma nova tarefa"""
    try:
        data = request.get_json()
        
        # Validação dos campos
        if not data or 'title' not in data:
            return jsonify({'error': 'O campo "title" é obrigatório'}), 400
            
        new_todo = Todo(
            title=data['title'],
            description=data.get('description'),  # Opcional
            due_date=data.get('due_date'),       # Opcional
            completed=data.get('completed', False)
        )
        
        db.session.add(new_todo)
        db.session.commit()
        return jsonify(new_todo.to_dict()), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500