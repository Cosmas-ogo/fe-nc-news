import axios from "axios";

const API_URL = "https://first-project-o5bz.onrender.com/api";

function getArticleById(articleId) {
  return axios
    .get(`${API_URL}/articles/${articleId}`)
    .then(function (response) {
      return response.data.article;
    })
    .catch(function (error) {
      if (error.response && error.response.status === 404) {
        throw new Error("Article not found.");
      }
      throw new Error(
        error.response?.data?.message || "Failed to fetch article"
      );
    });
}

function getCommentsByArticleId(articleId) {
  return axios
    .get(`${API_URL}/articles/${articleId}/comments`)
    .then(function (response) {
      return response.data.comments;
    })
    .catch(function (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch comments"
      );
    });
}

function getValidUsernames() {
  return axios
    .get(`${API_URL}/users`)
    .then(function (response) {
      return response.data.users.map(function (user) {
        return user.username;
      });
    })
    .catch(function (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch valid usernames"
      );
    });
}

function postComment(
  articleId,
  username,
  body,
  updateComments,
  setSuccess,
  setError
) {
  return getValidUsernames()
    .then(function (validUsernames) {
      if (!validUsernames.includes(username)) {
        return Promise.reject("Invalid username");
      }
      return axios.post(`${API_URL}/articles/${articleId}/comments`, {
        username,
        body,
      });
    })
    .then(function (response) {
      setSuccess("Comment added successfully!");

      setTimeout(() => {
        setSuccess("");
      }, 3000);

      const newComment = {
        ...response.data.comment,
        created_at: "Loading",
      };

      updateComments(function (prevComments) {
        return [newComment, ...prevComments];
      });
    })
    .catch(function (error) {
      setError("Invalid Username! Can not Post Comment");

      setTimeout(() => {
        setError("");
      }, 3000);
    });
}

function updateArticleVotes(articleId, inc_votes) {
  return axios
    .patch(`${API_URL}/articles/${articleId}`, { inc_votes })
    .then(function (response) {
      return response.data.article;
    })
    .catch(function (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update votes"
      );
    });
}
function deleteComment(commentId) {
  return axios
    .delete(`${API_URL}/comments/${commentId}`)
    .then(function () {})
    .catch(function (error) {
      throw new Error(
        error.response?.data?.message || "Failed to delete comment"
      );
    });
}

function fetchTopics() {
  return axios
    .get(`${API_URL}/topics`)
    .then(function (response) {
      return response.data.topics;
    })
    .catch(function (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch topics"
      );
    });
}

function fetchArticlesByTopic(topic) {
  return axios
    .get(`${API_URL}/articles?topic=${topic}`)
    .then(function (response) {
      return response.data.articles;
    })
    .catch(function (error) {
      if (error.response && error.response.status === 404) {
        throw new Error("Topic not found.");
      }
      throw new Error(
        error.response?.data?.message || "Failed to fetch articles for topic"
      );
    });
}

export {
  getArticleById,
  getCommentsByArticleId,
  getValidUsernames,
  postComment,
  updateArticleVotes,
  deleteComment,
  fetchTopics,
  fetchArticlesByTopic,
};
