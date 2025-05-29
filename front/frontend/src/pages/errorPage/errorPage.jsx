import { Link } from "react-router-dom";


function ErrorPage() {
  return (
    <div className="error-page flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-200 px-4 py-8">
      <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 drop-shadow-lg p-2">
          404 - Page Not Found
        </h1>
        <p className="text-center text-gray-600">Sorry, the page you are looking for does not exist.</p>
        <div className="mt-6 flex justify-center">
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}


export default ErrorPage;