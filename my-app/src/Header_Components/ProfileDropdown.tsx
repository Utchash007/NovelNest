import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getStoredAuth, getStoredUsername } from "../storage";
import { useAuth } from "../AuthContext";

const ProfileDropdown: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const storedAuth = getStoredAuth();
  const user_name = getStoredUsername();

  const toggleDropdown = () => {
    if (isActive) {
      if (timerRef.current) clearTimeout(timerRef.current);
      setIsActive(false);
    } else {
      setIsActive(true);
      timerRef.current = setTimeout(() => setIsActive(false), 3000);
    }
  };

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
      <ul className={`profile-dropdown-list ${isActive ? "active" : ""}`}>
        <li className="profile-dropdown-list-item">
          <Link to="/profile/edit">
            <i className="fa-regular fa-user"></i> Edit Profile
          </Link>
        </li>
        <li className="profile-dropdown-list-item">
          <Link to="/bookmarks">
            <i className="fa-solid fa-book"></i> Bookmarks
          </Link>
        </li>
        <li className="profile-dropdown-list-item">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              logout();
              navigate("/login");
            }}
          >
            <i className="fa-solid fa-arrow-right-from-bracket"></i> Log out
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ProfileDropdown;
