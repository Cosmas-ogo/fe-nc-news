import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, getCommentsByArticleId } from "../services/api";
import ArticleContent from "../components/ArticleContent";
import CommentsSection from "../components/CommentsSection";

const ArticleDetailsPage = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getArticleById(article_id).then(setArticle);
    getCommentsByArticleId(article_id).then(setComments);
  }, [article_id]);

  if (!article) return <p>Loading article...</p>;

  return (
    <div className="container mx-auto p-4">
      <ArticleContent article={article} />
      <CommentsSection comments={comments} articleId={article_id} />
    </div>
  );
};

export default ArticleDetailsPage;
