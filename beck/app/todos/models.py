from ..extensions import db

class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String(50), nullable=False)  # corrigido para 'user'
    title = db.Column(db.String(100), nullable=False)  # corrigido para 'title'
    description = db.Column(db.String(200), nullable=True)  # descrição opcional
    due_date = db.Column(db.DateTime, nullable=True)  # opcional, se quiser usar depois
    completed = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            'id': self.id,
            'user': self.user,
            'title': self.title,
            'description': self.description,
            'due_date': self.due_date.isoformat() if self.due_date else None,
            'completed': self.completed
        }
