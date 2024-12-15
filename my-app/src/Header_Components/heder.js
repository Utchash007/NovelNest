import React, { useState } from "react";
//import ProfileDropdown from "./ProfileDropdown";
import SearchBar from "./SearchBar";
import ProfileDropdown from "./ProfileDropdown";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to="/" className="logo">
        <img src="./Assets/NovelNestLogo.png"></img>
      </Link>
      <SearchBar />
      <ProfileDropdown/>
    </header>
  );
};

export default Header;
