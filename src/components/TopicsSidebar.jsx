import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchTopics } from "../services/api";

function TopicsSidebar() {
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

  if (isLoading)
    return (
      <div className="flex items-center justify-center">Loading topics...</div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center">
        Error: {error.message}
      </div>
    );

  return (
    <aside className="bg-white rounded shadow p-4 mb-6">
      <div className="flex flex-wrap justify-center gap-4">
        {topics.map(function (topic) {
          return (
            <Link to={`/topics/${topic.slug}`} key={topic.slug}>
              <button
                type="button"
                className="px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition"
              >
                {topic.slug}
              </button>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}

export default TopicsSidebar;
