import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService"; // Assuming you have this service
import './register.css'

const RegisterPage = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      return false;
    }

    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters long");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await registerUser(userName, email, password);
      if (response === "Registration successful") {
        navigate("/login"); // Redirect to login page after successful registration
      } else {
        setErrorMsg("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setErrorMsg("An error occurred during registration. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-logo">
          <h1>Sudo<span>ku</span></h1>
        </div>

        <h2 className="login-title">Create Account</h2>

        {errorMsg && <div className="error">{errorMsg}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Choose a username"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
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
              placeholder="Create a password"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
            />
          </div>

          <button type="submit">Sign Up</button>
        </form>

        <div className="signup-link">
          Already have an account? <a href="/login">Log in</a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;