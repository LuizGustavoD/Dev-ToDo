import { useState } from 'react'
import '../App.css'

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
        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-700 transition cursiror-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
        onClick={() => {
          if (task.trim() && description.trim()) {
            onAdd({ task, description });
          } else {
            alert("Preencha os campos corretamente!");
            return;
          }
          setTask('');
          setDescription('');
        }}
      >
        Adicionar Tarefa
      </button>
    </div>
  )
}

export default AddTask;