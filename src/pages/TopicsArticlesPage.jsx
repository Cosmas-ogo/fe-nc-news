import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchArticlesByTopic } from "../services/api";
import ArticlePreview from "../components/ArticlePreview";
import TopicsSidebar from "../components/TopicsSidebar";

function TopicArticlesPage() {
  const { topic } = useParams();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(
    function fetchData() {
      fetchArticlesByTopic(topic)
        .then(function (data) {
          setArticles(data);
          setIsLoading(false);
        })
        .catch(function (err) {
          setError("Failed to load articles.");
          setIsLoading(false);
        });
    },
    [topic]
  );

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="spinner mb-4"></div>
        <p className="text-xl font-bold text-blue-800">Loading articles...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-blue-800 text-center">
        Articles on "{topic}"
      </h1>
      <div className="mb-8">
        <TopicsSidebar />
      </div>
      <div className="articles-list grid grid-cols-1 gap-4">
        {articles.map(function (article) {
          return <ArticlePreview key={article.article_id} {...article} />;
        })}
      </div>
    </div>
  );
}

export default TopicArticlesPage;
