import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <>
      <div className="flex">
        <Navbar />
        <div className="flex-1 min-h-screen p-6 bg-gray-100 ml-64 overflow-auto">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
