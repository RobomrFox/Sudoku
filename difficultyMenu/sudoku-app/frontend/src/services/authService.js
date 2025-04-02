// services/authService.js
import axios from "axios";

export const loginUser = async (userName, password) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/login",
      { userName, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // if using session cookies
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (userName, email, password) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/register",
      { userName, email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // if needed for session management
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
