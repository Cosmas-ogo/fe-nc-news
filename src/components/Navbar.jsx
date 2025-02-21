import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
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
        <Link
          to="/profile"
          className="!text-blue-100 text-lg hover:text-yellow-300"
        >
          Profile
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
