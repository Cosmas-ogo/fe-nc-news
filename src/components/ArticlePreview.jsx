import React from "react";
import { Link } from "react-router-dom";

function ArticlePreview({
  article_id,
  title,
  author,
  votes,
  comment_count,
  topic,
  created_at,
  article_img_url,
}) {
  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300 bg-white">
      <img
        src={article_img_url}
        alt={title}
        className="w-full h-40 object-cover rounded-md mb-3"
      />
      <h3 className="text-lg font-semibold">
        <Link
          to={`/articles/${article_id}`}
          className="text-blue-600 hover:underline"
        >
          {title}
        </Link>
      </h3>
      <p className="text-gray-600 text-sm">By {author}</p>
      <p className="text-gray-500 text-xs">Topic: {topic}</p>
      <p className="text-gray-500 text-xs">
        Published: {new Date(created_at).toLocaleDateString()}
      </p>
      <div className="flex justify-between text-sm text-gray-500 mt-2">
        <span>Votes: {votes}</span>
        <span>Comments: {comment_count}</span>
      </div>
    </div>
  );
}

export default ArticlePreview;
