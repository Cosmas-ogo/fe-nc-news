import axios from "axios";

const API_URL = "https://first-project-o5bz.onrender.com/api";

export const getArticleById = async (articleId) => {
  const { data } = await axios.get(`${API_URL}/articles/${articleId}`);
  return data.article;
};

export const getCommentsByArticleId = async (articleId) => {
  const { data } = await axios.get(`${API_URL}/articles/${articleId}/comments`);
  return data.comments;
};

export const postComment = async (articleId, commentText) => {
  const { data } = await axios.post(
    `${API_URL}/articles/${articleId}/comments`,
    {
      username: "user123",
      body: commentText,
    }
  );
  return data.comment;
};
