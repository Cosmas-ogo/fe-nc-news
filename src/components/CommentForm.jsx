import { useEffect, useState } from "react";
import { postComment } from "../services/api";

function CommentForm({ articleId, onCommentAdded }) {
  const [commentText, setCommentText] = useState("");
  const [username, setUsername] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (username.trim() && commentText.trim()) {
      setError("");
    }
  }, [username, commentText]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!commentText.trim() || !username.trim()) {
      setError("Please fill out all required fields.");
      return;
    }

    setIsSubmitting(true);
    setSuccess("");
    setError("");

    postComment(
      articleId,
      username,
      commentText,
      onCommentAdded,
      setSuccess,
      setError
    )
      .then(() => {
        setCommentText("");
        setUsername("");
      })
      .catch((error) => {
        setError("An unexpected error occurred. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-200 p-4 rounded-lg shadow-sm"
    >
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-600"
        placeholder="Your Name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={isSubmitting}
      />
      <textarea
        className="w-full p-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-600 mt-2"
        placeholder="Write a comment..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        disabled={isSubmitting}
      ></textarea>
      <button
        type="submit"
        className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Posting..." : "Post Comment"}
      </button>
      {success && <p className="text-green-500 mt-2">{success}</p>}
      {error && (
        <p className="text-red-500 mt-2" aria-live="assertive">
          {error}
        </p>
      )}
    </form>
  );
}

export default CommentForm;
