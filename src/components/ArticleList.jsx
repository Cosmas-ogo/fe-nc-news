import React, { useState, useEffect } from "react";
import axios from "axios";
import ArticlePreview from "./ArticlePreview";
import Pagination from "./Pagination";
import SortOptions from "./SortOptions";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("created_at");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios
      .get(
        `https://first-project-o5bz.onrender.com/api/articles?sort_by=${sortBy}&limit=10&page=${currentPage}`
      )
      .then((response) => {
        console.log("API Response:", response.data);
        if (response.data && Array.isArray(response.data.articles)) {
          setArticles(response.data.articles);
          setTotalPages(Math.ceil(response.data.total_count / 10));
        } else {
          setArticles([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
        setError("Failed to load articles. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [sortBy, currentPage]);

  if (loading) {
    return <p className="text-center text-lg font-bold">Loading articles...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-lg font-bold text-red-600">{error}</p>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <SortOptions setSortBy={setSortBy} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {articles.length > 0 ? (
          articles.map((article) => (
            <ArticlePreview key={article.article_id} {...article} />
          ))
        ) : (
          <p className="text-center text-lg font-bold">No articles available</p>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ArticleList;
