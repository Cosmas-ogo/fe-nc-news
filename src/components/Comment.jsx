import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { deleteComment } from "../services/api";

function Comment({ comment, onDelete }) {
  const { user } = useContext(UserContext);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  function handleDelete() {
    if (!window.confirm("Are you sure you want to delete this comment?"))
      return;

    setIsDeleting(true);
    setError(null);

    deleteComment(comment.comment_id)
      .then(() => {
        onDelete(comment.comment_id);
      })
      .catch(() => {
        setError("Failed to delete comment. Please try again.");
      })
      .finally(() => {
        setIsDeleting(false);
      });
  }

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-sm relative">
      <p className="font-bold text-gray-900">{comment.author}</p>
      <p className="text-gray-700 text-sm">
        {comment.created_at
          ? new Date(comment.created_at).toLocaleString()
          : "Loading..."}
      </p>
      <p className="mt-2 text-gray-800">{comment.body}</p>

      {user?.username === comment.author && (
        <button
          type="button"
          className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 disabled:bg-gray-400"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      )}

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}

export default Comment;
