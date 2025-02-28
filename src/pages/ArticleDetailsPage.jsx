import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, getCommentsByArticleId } from "../services/api";
import ArticleContent from "../components/ArticleContent";
import CommentsSection from "../components/CommentsSection";
import RatingControls from "../components/RatingControls";
import CommentForm from "../components/CommentForm";

function ArticleDetailsPage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(
    function fetchData() {
      getArticleById(article_id)
        .then(setArticle)
        .catch(function handleError(error) {
          if (error.response && error.response.status === 404) {
            setError("Article not found.");
          } else {
            setError("Failed to load article.");
          }
        });

      getCommentsByArticleId(article_id)
        .then(function handleFetchedComments(fetchedComments) {
          setComments(function updateComments(prevComments) {
            const existingCommentIds = new Set(
              prevComments.map(function mapComments(c) {
                return c.comment_id;
              })
            );
            const newUniqueComments = fetchedComments.filter(
              function filterComments(c) {
                return !existingCommentIds.has(c.comment_id);
              }
            );
            return [...prevComments, ...newUniqueComments];
          });
        })
        .catch(function handleCommentError() {
          setError("Failed to load comments.");
        });
    },
    [article_id]
  );

  function handleVoteUpdate(newVotes) {
    setArticle(function updateArticle(prevArticle) {
      return { ...prevArticle, votes: newVotes };
    });
  }

  function handleNewComment(newComment) {
    setComments(function updateComments(prevComments) {
      return [newComment, ...prevComments];
    });

    setTimeout(function refreshComments() {
      getCommentsByArticleId(article_id).then(setComments);
    }, 1000);
  }

  function handleDeleteComment(commentId) {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.comment_id !== commentId)
    );
    setSuccessMessage("Comment successfully deleted.");
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  }

  if (error) return <p className="text-red-500">{error}</p>;

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="spinner mb-4"></div>
        <p className="text-xl font-bold text-blue-800">
          Loading article details...
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <ArticleContent article={article} />

      <div className="mt-4 p-3 border rounded shadow-md bg-white flex items-center justify-start">
        <p className="text-xl font-bold text-blue-600 mr-4">
          Votes: {article.votes}
        </p>
        <RatingControls
          articleId={article.article_id}
          initialVotes={article.votes}
          onVoteUpdate={handleVoteUpdate}
        />
      </div>

      <CommentForm articleId={article_id} onCommentAdded={handleNewComment} />

      {successMessage && (
        <div className="mt-2 text-green-600 font-semibold">
          {successMessage}
        </div>
      )}

      <CommentsSection comments={comments} onDelete={handleDeleteComment} />
    </div>
  );
}

export default ArticleDetailsPage;
