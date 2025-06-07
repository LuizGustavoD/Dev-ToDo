
import './ToDoStyle.css';

function ShowTasks({ tasks, onDelete }) {
  return  (
    <div className="flex flex-col items-center gap-6 rounded-xl bg-white p-6 shadow-lg w-full max-w-md mx-auto my-8">
      {tasks.length === 0 ? (
        <p className="text-gray-500">Nenhuma tarefa encontrada.</p>
      ) : (
        tasks.map((task, index) => (
          <div key={index} className="w-full p-4 border-b border-gray-200 hover:scale-110 transition-transform duration-300">
            <h3 className="text-lg font-semibold text-gray-800">{task.task}</h3>
            <p className="text-gray-600">{task.description}</p>
            <button
              className="mt-2 text-red-600 hover:text-red-800 cursor-pointer font-semibold transition-colors duration-200"
              onClick={() => {
                onDelete(index); // remove da lista local
                fetch(`http://localhost:5000/api/todos/${task.title}`, {
                  method: 'DELETE',
                })
                .then((res) => {
                  if (!res.ok) throw new Error('Erro ao deletar no backend');
                  console.log('Tarefa deletada com sucesso no backend');
                })
                .catch((err) => {
                  console.error('Erro ao deletar tarefa:', err);
                });
              }}
            >
              Excluir
            </button>
          </div>
        ))
      )}
    </div>
  )
}

export default ShowTasks;