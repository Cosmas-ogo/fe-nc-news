import axios from "axios";

const API_URL = "https://first-project-o5bz.onrender.com/api";

export const getArticleById = async (articleId) => {
  try {
    const { data } = await axios.get(`${API_URL}/articles/${articleId}`);
    return data.article;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch article");
  }
};

export const getCommentsByArticleId = async (articleId) => {
  try {
    const { data } = await axios.get(
      `${API_URL}/articles/${articleId}/comments`
    );
    return data.comments;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch comments"
    );
  }
};

export const getValidUsernames = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/users`);
    return data.users.map((user) => user.username);
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch valid usernames"
    );
  }
};

export const postComment = (
  articleId,
  username,
  body,
  updateComments,
  setSuccess
) => {
  return getValidUsernames()
    .then((validUsernames) => {
      if (!validUsernames.includes(username)) {
        return Promise.reject("Invalid username");
      }

      return axios.post(`${API_URL}/articles/${articleId}/comments`, {
        username,
        body,
      });
    })
    .then((response) => {
      console.log("API Response Data:", response.data);
      setSuccess("Comment added successfully!");

      const newComment = {
        ...response.data.comment,
        created_at: "Loading",
      };

      updateComments((prevComments) => [newComment, ...prevComments]);
    })

    .catch((error) => {
      console.error("Failed to post comment:", error);
    });
};

export const updateArticleVotes = async (articleId, inc_votes) => {
  try {
    const { data } = await axios.patch(`${API_URL}/articles/${articleId}`, {
      inc_votes,
    });
    return data.article;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update votes");
  }
};
