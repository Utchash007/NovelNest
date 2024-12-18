import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Header_Components/heder";
import Slider from "./template/Slider";
import Card from "./template/card";
import Homepage from "./Layout/homepage";
import "./styles.css";
import Novelpage from "./Layout/Novelpage";
import ChapterLayout from "./Layout/ChapterLayout";
import EditProfileLayout from "./Layout/EditProfileLayout";
import SearchResultLayout from "./Layout/SearchResultLayout";

const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          {/* Add the :id parameter here for Novelpage */}
          <Route path="/Novelpage/:id" element={<Novelpage />} />
          <Route path="/ChapterLayout/:novel_id/:cpt_no" element={<ChapterLayout />} />
          <Route path="/EditProfileLayout" element={<EditProfileLayout />} />
          <Route path="/SearchResultLayout/:searchQuery" element={<SearchResultLayout />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
