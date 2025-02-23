import Comment from "./Comment";

function CommentsSection({ comments, onDelete }) {
  return (
    <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        Comments ({comments?.length || 0})
      </h2>
      <div className="mt-4 space-y-4">
        {comments?.length > 0 ? (
          comments.map((comment, index) => (
            <Comment
              key={comment.comment_id ? comment.comment_id : `temp-${index}`}
              comment={comment}
              onDelete={onDelete}
            />
          ))
        ) : (
          <p className="text-gray-800">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
}

export default CommentsSection;
