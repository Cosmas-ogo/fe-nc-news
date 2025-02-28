import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-5xl font-bold text-red-600">404</h1>{" "}
      <p className="mt-4 text-lg text-gray-700">
        The page you are looking for does not exist.
      </p>
      <p className="mt-2 text-gray-600">
        Please check the URL or return to the{" "}
        <Link to="/" className="text-blue-500 hover:underline">
          homepage
        </Link>
      </p>
    </div>
  );
}

export default NotFound;
