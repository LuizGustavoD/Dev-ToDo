from flaks import Blueprint, request, jsonify
from .models import db, Todo

todo_bp = Blueprint('todos', __name__)
@todo_bp.route('/todos', methods=['GET'])
def get_todos():
    todos = Todo.query.all()
    return jsonify([todo.to_dict() for todo in todos]), 200

@todo_bp.route('/todos', methods=['POST'])
def create_todo():
    data = request.get_json()
    new_todo = Todo(**data)
    db.session.add(new_todo)
    db.session.commit()
    return jsonify(new_todo.to_dict()), 201