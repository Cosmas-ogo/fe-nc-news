import React, { useState, useEffect } from "react";
import { fetchTopics } from "../services/api";
import TopicsSidebar from "../components/TopicsSidebar";

function TopicsPage() {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(function () {
    fetchTopics()
      .then(function (data) {
        setTopics(data);
        setIsLoading(false);
      })
      .catch(function (err) {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold text-gray-800">Loading topics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold text-red-600">
          Error loading topics: {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-blue-800 text-center mb-8">
        Topics
      </h1>

      <div className="flex justify-center mb-10">
        <TopicsSidebar topics={topics} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {topics.map(function (topic) {
          return (
            <div
              key={topic.slug}
              className="p-6 bg-white border border-red-500 rounded-lg shadow hover:shadow-xl transition duration-200"
            >
              <h2 className="text-2xl font-bold text-blue-800 text-center mb-2">
                {topic.slug}
              </h2>
              <p className="text-gray-700 text-center">{topic.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TopicsPage;
