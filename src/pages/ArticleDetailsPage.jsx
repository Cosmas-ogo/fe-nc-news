import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, getCommentsByArticleId } from "../services/api";
import ArticleContent from "../components/ArticleContent";
import CommentsSection from "../components/CommentsSection";
import RatingControls from "../components/RatingControls";

const ArticleDetailsPage = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getArticleById(article_id)
      .then(setArticle)
      .catch((error) => console.error("Error fetching article:", error));

    getCommentsByArticleId(article_id)
      .then(setComments)
      .catch((error) => console.error("Error fetching comments:", error));
  }, [article_id]);

  const handleVoteUpdate = (newVotes) => {
    setArticle((prevArticle) => ({
      ...prevArticle,
      votes: newVotes,
    }));
  };

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

      <CommentsSection comments={comments} articleId={article_id} />
    </div>
  );
};

export default ArticleDetailsPage;
