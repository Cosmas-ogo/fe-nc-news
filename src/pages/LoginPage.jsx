import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { getValidUsernames } from "../services/api";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  function handleLogin(event) {
    event.preventDefault();
    setError(null);

    getValidUsernames()
      .then(function (validUsernames) {
        if (!validUsernames.includes(username)) {
          setError("Invalid username. Please try again.");
          return;
        }

        login({ username });
        navigate("/");
      })
      .catch(function () {
        setError("Failed to log in. Please try again.");
      });
  }

  return (
    <div className="container mx-auto p-6 max-w-sm">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={function (e) {
            setUsername(e.target.value);
          }}
          className="w-full p-2 border border-gray-400 rounded text-gray-900 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Log In
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  );
}

export default LoginPage;
