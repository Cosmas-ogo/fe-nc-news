import React from "react";
import ArticleList from "../components/ArticleList";

const HomePage = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col justify-start w-full">
      <h1 className="text-3xl font-bold mb-4 text-blue-800 text-center w-full">
        All Articles
      </h1>
      <div className="w-full max-w-6xl ml-auto mr-auto px-4">
        <ArticleList />
      </div>
    </div>
  );
};

export default HomePage;
