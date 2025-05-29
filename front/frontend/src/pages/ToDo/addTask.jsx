import { useState } from 'react'
import './ToDoStyle.css';

function AddTask({ onAdd }) {
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  return (
    <div className="flex flex-col items-center gap-6 rounded-xl bg-white p-6 shadow-lg w-full max-w-md mx-auto my-8">
      <input
        className="w-full p-3 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Título da tarefa"
      />
      <input
        className="w-full p-3 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descrição da tarefa"
      />
      <button
        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-700 transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
        onClick={() => {
          if (task.trim() && description.trim()) {
            // Mude de 'task' para 'title' para corresponder ao modelo
            fetch('http://localhost:5000/api/todos', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ 
                title: task,  // Agora usando 'title' em vez de 'task'
                description: description 
              })
            })
            .then(res => res.json())
            .then(data => {
              console.log(data.message);
              onAdd({ title: task, description }); // atualiza local
              setTask('');
              setDescription('');
            });
          } else {
            alert("Preencha os campos corretamente!");
          }
        }}
      >
        Adicionar Tarefa
      </button>
    </div>
  )
}

export default AddTask;