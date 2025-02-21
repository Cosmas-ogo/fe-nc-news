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
  console.log("Current state of comments:", comments);
  const [error, setError] = useState(null);

  useEffect(() => {
    getArticleById(article_id)
      .then(setArticle)
      .catch(() => {
        setError("Failed to load article.");
      });

    getCommentsByArticleId(article_id)
      .then((fetchedComments) => {
        setComments((prevComments) => {
          const existingCommentIds = new Set(
            prevComments.map((c) => c.comment_id)
          );
          const newUniqueComments = fetchedComments.filter(
            (c) => !existingCommentIds.has(c.comment_id)
          );
          return [...prevComments, ...newUniqueComments];
        });
      })
      .catch(() => setError("Failed to load comments."));
  }, [article_id]);

  function handleVoteUpdate(newVotes) {
    setArticle((prevArticle) => ({
      ...prevArticle,
      votes: newVotes,
    }));
  }

  function handleNewComment(newComment) {
    setComments((prevComments) => [newComment, ...prevComments]);

    setTimeout(() => {
      getCommentsByArticleId(article_id).then(setComments);
    }, 1000);
  }

  if (error) return <p className="text-red-500">{error}</p>;
  if (!article) return <p>Loading article...</p>;

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
      <CommentsSection comments={comments} articleId={article_id} />
    </div>
  );
}

export default ArticleDetailsPage;
