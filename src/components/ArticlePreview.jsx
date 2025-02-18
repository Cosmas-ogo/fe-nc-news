import React from "react";
import { Link } from "react-router-dom";

const ArticlePreview = ({
  article_id,
  title,
  author,
  votes,
  comment_count,
}) => {
  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300">
      <h3 className="text-lg font-semibold">
        <Link
          to={`/articles/${article_id}`}
          className="text-blue-600 hover:underline"
        >
          {title}
        </Link>
      </h3>
      <p className="text-gray-600">By {author}</p>
      <div className="flex justify-between text-sm text-gray-500 mt-2">
        <span>Votes: {votes}</span>
        <span>Comments: {comment_count}</span>
      </div>
    </div>
  );
};

export default ArticlePreview;
