import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./loginstyle.css";
import { useAuth } from "../AuthContext";

const LoginSignup: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  const { login, register } = useAuth();

  const handleLoginSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMsg("");
    if (!loginEmail || !loginPassword) {
      setErrorMsg("Please fill in all fields.");
      return;
    }
    const success = await login(loginEmail, loginPassword);
    if (success) {
      navigate("/");
    } else {
      setErrorMsg("Invalid credentials. Please try again.");
    }
  };

  const handleRegisterSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMsg("");
    if (!signupEmail || !signupPassword || !signupName) {
      setErrorMsg("Please fill in all fields.");
      return;
    }
    const success = await register(signupEmail, signupPassword, signupName);
    if (success) {
      navigate("/");
    } else {
      setErrorMsg("Registration failed. Please make sure email is unique.");
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
            <form onSubmit={handleRegisterSubmit}>
              <h1>Create Account</h1>
              {errorMsg && <p className="error-text" style={{ color: "red", fontSize: "14px" }}>{errorMsg}</p>}
              <input
                type="text"
                placeholder="Name"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
              />
              <label>Sign Up as:</label>
              <select>
                <option value="reader">Reader</option>
                <option value="author">Author</option>
              </select>
              <button type="submit">Sign Up</button>
            </form>
          </div>

          <div className="form-container sign-in">
            <form onSubmit={handleLoginSubmit}>
              <h1>Sign In</h1>
              {errorMsg && <p className="error-text" style={{ color: "red", fontSize: "14px" }}>{errorMsg}</p>}
              <input
                type="email"
                placeholder="Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
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
                <button className="hidden" onClick={() => { setIsActive(false); setErrorMsg(""); }} id="login">
                  Sign In
                </button>
              </div>
              <div className="toggle-panel toggle-right">
                <h1>Don't have an account?</h1>
                <p>Register with your personal details to read novels</p>
                <button className="hidden" onClick={() => { setIsActive(true); setErrorMsg(""); }} id="register">
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
