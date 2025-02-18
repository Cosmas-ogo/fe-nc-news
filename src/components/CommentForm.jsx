import { useState } from "react";
import { postComment } from "../services/api";

const CommentForm = ({ articleId }) => {
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setIsSubmitting(true);
    postComment(articleId, commentText)
      .then(() => {
        setCommentText("");
        setIsSubmitting(false);
        window.location.reload();
      })
      .catch(() => setIsSubmitting(false));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-200 p-4 rounded-lg shadow-sm"
    >
      <textarea
        className="w-full p-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-600"
        placeholder="Write a comment..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        required
      ></textarea>
      <button
        type="submit"
        className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Posting..." : "Post Comment"}
      </button>
    </form>
  );
};

export default CommentForm;
