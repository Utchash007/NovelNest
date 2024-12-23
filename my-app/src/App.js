import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Header from "./Header_Components/heder";
import Slider from "./template/Slider";
import Card from "./template/card";
import Homepage from "./Layout/homepage";
import "./styles.css";
import Novelpage from "./Layout/Novelpage";
import ChapterLayout from "./Layout/ChapterLayout";
import EditProfileLayout from "./Layout/EditProfileLayout";
import SearchResultLayout from "./Layout/SearchResultLayout";
import { isAuthenticated } from "./authUtils";
import LoginSignup from "./LoginSignup/LoginSignup";

const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/LoginSignup" replace />;
};

const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
        <Route path="/" element={<PrivateRoute element={<Homepage />} />} />
          {/* Add the :id parameter here for Novelpage */}
          <Route path="/Novelpage/:id" element={<PrivateRoute element={<Novelpage />} />} />
          <Route path="/ChapterLayout/:novel_id/:cpt_no" element={<ChapterLayout />}/>
          <Route path="/EditProfileLayout" element={<EditProfileLayout />} />
          <Route path="/SearchResultLayout/:searchQuery" element={<SearchResultLayout />} />

          <Route path="/LoginSignup" element={<LoginSignup/>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
