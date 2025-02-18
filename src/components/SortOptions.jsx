import React from "react";

const validSortBy = [
  "created_at",
  "title",
  "author",
  "votes",
  "article_id",
  "topic",
];

const sortLabels = {
  created_at: "Sort by Date",
  title: "Sort by Title",
  author: "Sort by Author",
  votes: "Sort by Votes",
  article_id: "Sort by ID",
  topic: "Sort by Topics",
};

const SortOptions = ({ setSortBy }) => {
  return (
    <div className="flex justify-center mb-4 space-x-2">
      {validSortBy.map((sortOption) => (
        <button
          key={sortOption}
          className="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300"
          onClick={() => setSortBy(sortOption)}
        >
          {sortLabels[sortOption]}
        </button>
      ))}
    </div>
  );
};

export default SortOptions;
