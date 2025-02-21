import React, { useState, useEffect } from "react";
import axios from "axios";
import ArticlePreview from "./ArticlePreview";
import Pagination from "./Pagination";
import SortOptions from "./SortOptions";

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get(
        `https://first-project-o5bz.onrender.com/api/articles?sort_by=${sortBy}&order=${sortOrder}&limit=10&page=${currentPage}`
      )
      .then((response) => {
        if (response.data && Array.isArray(response.data.articles)) {
          setArticles(response.data.articles);
          setTotalPages(Math.ceil(response.data.total_count / 10));
        } else {
          setArticles([]);
        }
      })
      .catch((error) => {
        setError("Failed to load articles. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [sortBy, sortOrder, currentPage]);

  return (
    <div className="container mx-auto p-4">
      <SortOptions
        setSortBy={setSortBy}
        setSortOrder={setSortOrder}
        sortBy={sortBy}
        sortOrder={sortOrder}
      />
      {loading ? (
        <p className="text-center text-lg font-bold text-blue-600">
          Loading articles...
        </p>
      ) : error ? (
        <p className="text-center text-lg font-bold text-red-600">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {articles.length > 0 ? (
            articles.map((article) => (
              <ArticlePreview key={article.article_id} {...article} />
            ))
          ) : (
            <p className="text-center text-lg font-bold text-blue-600">
              No articles available
            </p>
          )}
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default ArticleList;
