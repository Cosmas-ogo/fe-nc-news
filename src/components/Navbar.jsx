import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-800 text-white fixed top-0 left-0 w-full sm:w-64 h-auto sm:h-screen p-4 shadow-lg sm:fixed">
      <div className="flex justify-between items-center sm:hidden">
        <div className="flex items-center space-x-2">
          <Link to="/" className="text-yellow-300 text-2xl font-bold">
            Northcoders News
          </Link>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white text-2xl"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      <div
        className={`sm:flex flex-col space-y-6 mt-4 sm:mt-0 ${
          isOpen ? "block" : "hidden sm:block"
        }`}
      >
        <Link
          to="/"
          className="text-yellow-300 text-2xl font-bold hidden sm:block"
        >
          Northcoders News
        </Link>
        <Link to="/" className="text-gray-200 text-lg hover:text-yellow-300">
          Home
        </Link>
        <Link
          to="/topics"
          className="text-gray-200 text-lg hover:text-yellow-300"
        >
          Topics
        </Link>
        <Link
          to="/profile"
          className="text-gray-200 text-lg hover:text-yellow-300"
        >
          Profile
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
