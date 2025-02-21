import React, { useState } from "react";
import { updateArticleVotes } from "../services/api";

function RatingControls({ articleId, initialVotes, onVoteUpdate }) {
  const [votes, setVotes] = useState(initialVotes);
  const [userVote, setUserVote] = useState(0);
  const [error, setError] = useState(null);
  const [isVoting, setIsVoting] = useState(false);

  async function handleVote(change) {
    if (isVoting) return;

    let voteChange = 0;

    if (userVote === change) {
      voteChange = -change;
      setUserVote(0);
    } else if (userVote === 0) {
      voteChange = change;
      setUserVote(change);
    } else {
      return;
    }

    setVotes((prevVotes) => prevVotes + voteChange);
    setError(null);
    setIsVoting(true);

    try {
      const updatedArticle = await updateArticleVotes(articleId, voteChange);
      setVotes(updatedArticle.votes);
      if (onVoteUpdate) {
        onVoteUpdate(updatedArticle.votes);
      }
    } catch (err) {
      setVotes((prevVotes) => prevVotes - voteChange);
      setError("Failed to update rating. Please try again.");
    } finally {
      setIsVoting(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        className={`p-2 border rounded hover:bg-gray-200 ${
          userVote === 1 ? "bg-green-300" : ""
        }`}
        onClick={() => handleVote(1)}
        disabled={isVoting}
      >
        👍
      </button>
      <span className="font-semibold">Votes: {votes}</span>
      <button
        className={`p-2 border rounded hover:bg-gray-200 ${
          userVote === -1 ? "bg-red-300" : ""
        }`}
        onClick={() => handleVote(-1)}
        disabled={isVoting}
      >
        👎
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

export default RatingControls;
