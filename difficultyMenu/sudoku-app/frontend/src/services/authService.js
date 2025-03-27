// Example authService.js
import axios from "axios";

export const loginUser = async (userName, password) => {
  try {
    // Replace the URL with your backend endpoint.
    const response = await axios.post("http://localhost:8080/auth/login", null, {
      params: { userName, password },
    });
    return response.data; // Expecting "Login successful" on success.
  } catch (error) {
    throw error;
  }
};
