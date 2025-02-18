// const Comment = ({ comment }) => {
//   return (
//     <div className="bg-gray-100 p-4 rounded-lg">
//       <p className="font-bold">{comment.author}</p>
//       <p className="text-gray-600 text-sm">
//         {new Date(comment.created_at).toLocaleString()}
//       </p>
//       <p className="mt-2">{comment.body}</p>
//     </div>
//   );
// };

// export default Comment;

// src/components/Comment.jsx
const Comment = ({ comment }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
      <p className="font-bold text-gray-900">{comment.author}</p>{" "}
      {/* ✅ Darker color for author name */}
      <p className="text-gray-700 text-sm">
        {new Date(comment.created_at).toLocaleString()}
      </p>{" "}
      {/* ✅ Increased contrast */}
      <p className="mt-2 text-gray-800">{comment.body}</p>{" "}
      {/* ✅ Darker text for readability */}
    </div>
  );
};

export default Comment;
