function Comment({ comment }) {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
      <p className="font-bold text-gray-900">{comment.author}</p>

      <p className="text-gray-700 text-sm">
        {comment.created_at
          ? new Date(comment.created_at).toLocaleString()
          : "Loading..."}
      </p>
      <p className="mt-2 text-gray-800">{comment.body}</p>
    </div>
  );
}

export default Comment;
