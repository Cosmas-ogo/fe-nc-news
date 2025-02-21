import React from "react";

function ArticleContent({ article }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{article.title}</h1>
      <p className="text-gray-700">
        By <span className="font-semibold">{article.author}</span> |{" "}
        {new Date(article.created_at).toLocaleDateString()}
      </p>
      {article.article_img_url && (
        <img
          src={article.article_img_url}
          alt={article.title}
          className="w-full h-64 object-cover rounded-lg my-4"
        />
      )}
      <p className="text-lg text-gray-800 leading-relaxed">{article.body}</p>
    </div>
  );
}

export default ArticleContent;
