import "./loginStyle.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex items-center align-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-200 px-4 py-8">
      <form className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6">
        <header className="text-center">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 drop-shadow-lg p-2">
            Login
          </h1>
        </header>

        <div>
          <label
            htmlFor="username"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-300"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-300"
          />
        </div>

        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            console.log("Logging in:", { username, password });
            fetch("http://localhost:5000/api/auth", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                action: "login",
                username,
                password,
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log("Resposta do login:", data.message);
                if (data.success) {
                  window.location.href = "https://localhost:5173/";
                }
              })
              .catch((error) => {
                console.error("Erro ao fazer login:", error);
              });
          }}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-2 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 hover:cursor-pointer"
        >
          Login
        </button>
        <p className="text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
