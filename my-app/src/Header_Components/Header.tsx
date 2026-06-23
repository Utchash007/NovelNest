import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import ProfileDropdown from "./ProfileDropdown";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <div>
      <header>
        <Link to="/" className="logo">
          <img src="/Assets/NovelNestLogo.png" alt="NovelNest Logo" />
        </Link>
        <SearchBar />
        <ProfileDropdown />
      </header>
      <Navbar />
    </div>
  );
};

export default Header;
