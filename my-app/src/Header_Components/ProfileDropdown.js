import React, { useState } from "react";
import EditProfileLayout from "../Layout/EditProfileLayout";
import { Link } from "react-router-dom";
const ProfileDropdown = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleDropdown = () => setIsActive(!isActive);

  return (
    <div className="profile-dropdown">
      <div onClick={toggleDropdown} className="profile-dropdown-btn">
        <div className="profile-img">
          <i className="fa-solid fa-circle"></i>
        </div>
        <span>
          User
          <i className="fa-solid fa-angle-down"></i>
        </span>
      </div>
      {isActive && (
        <ul className="profile-dropdown-list active">
          <li className="profile-dropdown-list-item">
            <Link to="/EditProfileLayout">
              <i className="fa-regular fa-user"></i> Edit Profile
              </Link>
          </li>
          <li className="profile-dropdown-list-item">
            <a href="#">
              <i className="fa-solid fa-book"></i> Bookmarks
            </a>
          </li>
          <li className="profile-dropdown-list-item">
            <a href="#">
              <i className="fa-solid fa-arrow-right-from-bracket"></i> Log out
            </a>
          </li>
        </ul>
      )}
    </div>
  );
};

export default ProfileDropdown;
