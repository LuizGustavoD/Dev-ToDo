import { useState, useEffect } from 'react'
import './App.css'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import AddTask from './pages/ToDo/addTask'
import ShowTasks from './pages/ToDo/showTasks'

function App() {
  const [tasks, setTasks] = useState([])
  const [usuario, setUsuario] = useState(null)
  const navigate = useNavigate()

  // Carrega autenticação ao montar o componente
  useEffect(() => {
    fetch("http://localhost:5000/auth/verify", {
      method: "GET",
      credentials: "include"
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUsuario(data.username)
        } else {
          setUsuario(null)
        }
      })
      .catch((err) => {
        console.error("Erro ao verificar autenticação:", err)
        setUsuario(null)
      })
  }, [])

  function deleteTask(index) {
    const newTasks = tasks.filter((_, i) => i !== index)
    setTasks(newTasks)
  }

  function addTask(newTaskObj) {
    setTasks([...tasks, newTaskObj])
  }

  function handleLogout() {
    fetch("http://localhost:5000/auth/logout", {
      method: "POST",
      credentials: "include"
    })
      .then(() => {
        setUsuario(null)
        navigate("/login")
      })
      .catch((err) => {
        console.error("Erro ao fazer logout:", err)
      })
  }

  return (
    <div className="flex flex-col min-h-screen gap-1 bg-gradient-to-br from-gray-50 to-blue-100">
      <header className="relative flex justify-center items-center h-20 bg-white shadow-md">
        <nav className="absolute right-8 top-1/2 -translate-y-1/2">
          <ul className="flex space-x-6">
            <li>
              {usuario ? (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg text-blue-600 font-semibold hover:bg-blue-50 hover:text-blue-800 transition-colors duration-200 shadow-sm"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg text-blue-600 font-semibold hover:bg-blue-50 hover:text-blue-800 transition-colors duration-200 shadow-sm"
                >
                  Login
                </Link>
              )}
            </li>
            <li>
              {usuario ? (
                <Link
                  to="/account"
                  className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-blue-500 to-purple-500 font-semibold hover:from-blue-600 hover:to-purple-600 transition-colors duration-200 shadow-md"
                >
                  My Account
                </Link>
              ) : (
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-blue-500 to-purple-500 font-semibold hover:from-blue-600 hover:to-purple-600 transition-colors duration-200 shadow-md"
                >
                  Register
                </Link>
              )}
            </li>
          </ul>
        </nav>
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 drop-shadow-lg tracking-wide p-3">
          My_ToDoList
        </h1>
      </header>
      <main className="flex flex-col justify-center items-start mt-10">
        <AddTask onAdd={addTask} />
        <ShowTasks tasks={tasks} onDelete={deleteTask} />
      </main>
    </div>
  )
}

export default App
