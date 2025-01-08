import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import LoginSignup from "./LoginSignup/LoginSignup";
import { isAuthenticated } from "./authUtils"; // Import the authentication function

const Main = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      const authenticated = await isAuthenticated(); 
      setIsLoggedIn(authenticated); 
    };

    checkAuthentication(); 
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true); 
  };

  return isLoggedIn ? (
    <App />
  ) : (
    <LoginSignup onLoginSuccess={handleLoginSuccess} />
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
