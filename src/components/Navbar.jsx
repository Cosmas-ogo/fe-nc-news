import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="bg-blue-800 text-white fixed top-0 left-0 w-64 h-screen p-4 shadow-lg">
      <Link to="/" className="!text-blue-100 text-2xl font-bold">
        Northcoders News
      </Link>

      <div className="flex flex-col space-y-6 mt-6">
        <Link to="/" className="!text-blue-100 text-lg hover:text-yellow-300">
          Home
        </Link>
        <Link
          to="/topics"
          className="!text-blue-100 text-lg hover:text-yellow-300"
        >
          Topics
        </Link>

        {user ? (
          <>
            <Link
              to="/profile"
              className="!text-blue-100 text-lg hover:text-yellow-300"
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="mt-4 bg-red-500 px-3 py-1 rounded text-sm hover:bg-red-600"
            >
              Log Out
            </button>
            <p className="text-sm text-gray-300 mt-2">
              Welcome, {user.username}
            </p>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-green-500 px-3 py-1 rounded text-sm hover:bg-green-600 mt-4"
          >
            Log In
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
