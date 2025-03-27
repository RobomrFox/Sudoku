import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(userName, password);
      // If login is successful, redirect user to the game page.
      if (response === "Login successful") {
        navigate("/gamepage"); // Redirect to game page instead of profile page.
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
      <h1>Login</h1>
      {errorMsg && <div className="error">{errorMsg}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username:
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
