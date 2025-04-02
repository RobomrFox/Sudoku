import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";
import "./register.css";

const RegisterPage = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
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
     console.log("Registration response:", response);
     // Check the msg property from the response.
     if (response && response.msg === "User registered successfully") {
       navigate("/login"); // Registration succeeded; redirect to login.
     } else {
       // If there is an error message from the backend, display it.
       setErrorMsg(response && response.msg ? response.msg : "Registration failed. Please try again.");
     }
   } catch (error) {
     console.error("Error during registration:", error);
     setErrorMsg("An error occurred during registration. Please try again.");
   }
 };




  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-logo">
          <h1>
            Sudo<span>ku</span>
          </h1>
        </div>

        <h2 className="register-title">Create Account</h2>

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

          <button type="submit">Sign Up</button>
        </form>

        <div className="login-link">
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
