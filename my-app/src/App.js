import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header_Components/heder";
import Homepage from "./Layout/homepage";
import Novelpage from "./Layout/Novelpage";
import ChapterLayout from "./Layout/ChapterLayout";
import EditProfileLayout from "./Layout/EditProfileLayout";
import SearchResultLayout from "./Layout/SearchResultLayout";
import LoginSignup from "./LoginSignup/LoginSignup";
import PrivateRouter from "./PrivateRouter";
import "./styles.css";

import { getToken } from "./Common";

const App = () => {

  const isAuthenticated = getToken();

  return (
    <Router>
      {isAuthenticated && <Header />}
      <Routes>
        
        {/* Public Routes */}
        <Route path="/LoginSignup" element={<LoginSignup />} />
        
        {/* Private Routes */}
        <Route element={<PrivateRouter />}>
          <Route path="/" element={<Homepage />} />
        </Route>


        <Route element={<PrivateRouter />}>
          <Route path="/Novelpage/:id" element={<Novelpage />} />
          <Route
            path="/ChapterLayout/:novel_id/:cpt_no"
            element={<ChapterLayout />}
          />
          <Route path="/EditProfileLayout" element={<EditProfileLayout />} />
          <Route
            path="/SearchResultLayout/:searchQuery"
            element={<SearchResultLayout />}
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
