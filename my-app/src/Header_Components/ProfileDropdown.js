import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { decode } from "../decodeJWT";

const ProfileDropdown = () => {
  const [isActive, setIsActive] = useState(false);
  const [timer, setTimer] = useState(null);
  const toggleDropdown = () => {
    if (isActive) {
      clearTimeout(timer); // Clear existing timeout if dropdown is already active
      setIsActive(false);
    } else {
      setIsActive(true);
      const timeoutId = setTimeout(() => {
        setIsActive(false);
      }, 3000); // Remove active state after 3 seconds
      setTimer(timeoutId);
    }
  };
  
  const [userData, setUserData] = useState([]);
  const user_id = decode(localStorage.getItem("active")).user_id;
  const user_name = localStorage.getItem("username");

  useEffect(() => {
    const url1 = `http://127.0.0.1:8000/api/users/get_user/?id=${user_id}`;

    axios
      .get(url1)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [user_id]);

  return (
    <div className="profile-dropdown">
      <div onClick={toggleDropdown} className="profile-dropdown-btn">
        <div className="profile-img">
          <i className="fa-solid fa-circle"></i>
        </div>
        <span>
          {user_name}
          <i className="fa-solid fa-angle-down"></i>
        </span>
      </div>
      <ul
        className={`profile-dropdown-list ${isActive ? "active" : ""}`}
      >
        <li className="profile-dropdown-list-item">
          <Link to="/EditProfileLayout">
            <i className="fa-regular fa-user"></i> Edit Profile
          </Link>
        </li>
        <li className="profile-dropdown-list-item">
          <Link to="/Bookmark">
            <i className="fa-solid fa-book"></i> Bookmarks
          </Link>
        </li>
        <li className="profile-dropdown-list-item">
          <Link
            to="/LoginSignup"
            onClick={() => {
              localStorage.removeItem("active");
              localStorage.removeItem("username");
              window.location.reload();
            }}
          >
            <i className="fa-solid fa-arrow-right-from-bracket"></i> Log out
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ProfileDropdown;
