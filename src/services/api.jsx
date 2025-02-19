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

export const updateArticleVotes = async (articleId, voteChange) => {
  try {
    const { data } = await axios.patch(`${API_URL}/articles/${articleId}`, {
      inc_votes: voteChange,
    });
    return data.article;
  } catch (error) {
    console.error(
      "Error updating votes:",
      error.response?.data?.message || error.message
    );
    throw new Error(error.response?.data?.message || "Failed to update votes");
  }
};
