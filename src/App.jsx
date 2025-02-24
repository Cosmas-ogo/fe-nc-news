import React from "react";
import { Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ArticleDetailsPage from "./pages/ArticleDetailsPage";
import LoginPage from "./pages/LoginPage";
import ScrollToTop from "./components/ScrollToTop";
import TopicsPage from "./pages/TopicsPage";
import TopicArticlesPage from "./pages/TopicsArticlesPage";

const App = () => {
  return (
    <UserProvider>
      {" "}
      <div className="flex">
        <Navbar />
        <div className="flex-1 min-h-screen p-6 bg-gray-100 ml-64 overflow-auto">
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/articles/:article_id"
              element={<ArticleDetailsPage />}
            />
            <Route path="/login" element={<LoginPage />} />{" "}
            <Route path="/topics" element={<TopicsPage />} />
            <Route path="/topics/:topic" element={<TopicArticlesPage />} />
          </Routes>
        </div>
      </div>
    </UserProvider>
  );
};

export default App;
