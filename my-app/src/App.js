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
const App = () => {
  return (
    <div>
      <Router>
      <Header />
      
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Novelpage" element={<Novelpage />} />
        <Route path="/ChapterLayout" element={<ChapterLayout />} />
        <Route path="/EditProfileLayout" element={<EditProfileLayout />} />
      </Routes>
    </Router>
     </div>
  );
};

export default App;
