import React from "react";

const validSortBy = ["created_at", "votes", "article_id", "comment_count"];

const sortLabels = {
  created_at: "Sort by Date",
  votes: "Sort by Votes",
  article_id: "Sort by ID",
  comment_count: "Sort by Comments",
};

function SortOptions({ setSortBy, setSortOrder, sortBy, sortOrder }) {
  function toggleSortOrder(field) {
    if (sortBy === field) {
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4 mb-6">
      <div className="flex flex-wrap justify-center space-x-2">
        {validSortBy.map((sortOption) => (
          <button
            key={sortOption}
            className={`px-4 py-2 border rounded ${
              sortBy === sortOption ? "bg-gray-400" : "bg-gray-200"
            } hover:bg-gray-300`}
            onClick={() => setSortBy(sortOption)}
          >
            {sortLabels[sortOption]}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center space-x-2 mt-4">
        <button
          className="px-4 py-2 border rounded bg-blue-400 hover:bg-blue-500 text-white"
          onClick={() => {
            setSortBy("created_at");
            setSortOrder("desc");
          }}
        >
          Most Recent
        </button>

        <button
          className={`px-4 py-2 border rounded ${
            sortBy === "title" && sortOrder === "asc"
              ? "bg-green-500"
              : "bg-green-400"
          } hover:bg-green-500 text-white`}
          onClick={() => toggleSortOrder("title")}
        >
          {sortBy === "title" && sortOrder === "asc"
            ? "Sort Title: Z-A"
            : "Sort Title: A-Z"}
        </button>

        <button
          className={`px-4 py-2 border rounded ${
            sortBy === "author" && sortOrder === "asc"
              ? "bg-purple-500"
              : "bg-purple-400"
          } hover:bg-purple-500 text-white`}
          onClick={() => toggleSortOrder("author")}
        >
          {sortBy === "author" && sortOrder === "asc"
            ? "Sort Author: Z-A"
            : "Sort Author: A-Z"}
        </button>

        <button
          className={`px-4 py-2 border rounded ${
            sortBy === "topic" && sortOrder === "asc"
              ? "bg-orange-500"
              : "bg-orange-400"
          } hover:bg-orange-500 text-white`}
          onClick={() => toggleSortOrder("topic")}
        >
          {sortBy === "topic" && sortOrder === "asc"
            ? "Sort Topic: Z-A"
            : "Sort Topic: A-Z"}
        </button>
        <button
          className={`px-4 py-2 border rounded ${
            sortBy === "comment_count" && sortOrder === "asc"
              ? "bg-yellow-500"
              : "bg-yellow-400"
          } hover:bg-yellow-500 text-white`}
          onClick={() => toggleSortOrder("comment_count")}
        >
          {sortBy === "comment_count" && sortOrder === "asc"
            ? "Sort Comments: High-Low"
            : "Sort Comments: Low-High"}
        </button>
      </div>
    </div>
  );
}

export default SortOptions;
