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
import Bookmark from "./Layout/Bookmark";
import AllNovels from "./Layout/AllNovels";
import AdvSearchResultLayout from "./Layout/AdvSearchResultLayout";
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
        </Route>

        <Route element={<PrivateRouter />}>
          <Route
            path="/ChapterLayout/:novel_id/:cpt_no"
            element={<ChapterLayout />}
          />
          </Route>

          <Route element={<PrivateRouter />}> 
          <Route path="/EditProfileLayout" element={<EditProfileLayout />} />
          <Route
            path="/SearchResultLayout/:searchQuery"
            element={<SearchResultLayout />}
          />
        </Route>

        <Route element={<PrivateRouter />}>
          <Route path="/Bookmark" element={<Bookmark/>} />
        </Route>

        <Route element={<PrivateRouter />}>
          <Route path="/AllNovels" element={<AllNovels/>} />
        </Route>

        <Route element={<PrivateRouter />}>
          <Route path="/AdvSearchResultLayout/:action/:adventure/:isekai/:fantasy/:slice_of_life/:search" element={<AdvSearchResultLayout/>} />
        </Route>

      </Routes>
    </Router>
  );
};

export default App;
