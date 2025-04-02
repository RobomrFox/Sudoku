import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";
import "./login.css";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(userName, password);
      // Check the response message or status returned from your backend
      if (response === "Login successful") {
        // Redirect to the game page. Ensure this route exists in App.jsx.
        navigate("/");
      } else {
        setErrorMsg("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMsg("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-logo">
          <h1>
            Sudo<span>ku</span>
          </h1>
        </div>

        {errorMsg && <div className="error">{errorMsg}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit">Login</button>
        </form>

        <div className="signup-link">
          Don't have an account? <Link to="/register">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
