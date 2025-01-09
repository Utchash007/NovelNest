import React, { useState } from "react";
import "./loginstyle.css";
import axios from "axios";
const LoginSignup = ({ onLoginSuccess }) => {
  const [isActive, setIsActive] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  const handleLoginSubmit =async (event) => {
    
    event.preventDefault();

    try{
        const response= await axios.post("http://127.0.0.1:8000/api/token/",
        {
            username : email,
            password : password
        }
    );

    if(response.status===200){
        localStorage.setItem("username", email);
        localStorage.setItem("active", JSON.stringify(response.data));
        onLoginSuccess();
    }else{
        console.error("Invalid credentials");
    }
    }catch(error){
        console.error("Error logging in", error);
    }
  };

 
  
  return (
    
    <div>
        <div className="loginWrap">
      <div className="img">
        <img src="/Assets/logo.png" width="150" height="80" alt="Logo" />
      </div>
      <div className={`container ${isActive ? "active" : ""}`} id="container">
        <div className="form-container sign-up">
          <form>
            <h1>Create Account</h1>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <label>Sign Up as:</label>
            <select>
              <option value="option1">Reader</option>
              <option value="option2">Author</option>
            </select>
            <button type="button">Sign Up</button>
          </form>
        </div>

        <div className="form-container sign-in">
          <form onSubmit={handleLoginSubmit}>
            <h1>Sign In</h1>
            <input
              type="text"
              placeholder="User Name"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <a href="#">Forget Your Password?</a>
            <button type="submit">Sign In</button>
          </form>
        </div>

        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button className="hidden" onClick={handleLoginClick} id="login">
                Sign In
              </button>
            </div>

            <div className="toggle-panel toggle-right">
              <h1>Don't have an account?</h1>
              <p>Register with your personal details to read novels</p>
              <button className="hidden" onClick={handleRegisterClick} id="register">
                Sign Up
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
