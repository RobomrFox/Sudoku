import axios from "axios";

export const getUserProfile = async () => {
  try {
    // Use the full backend URL if not using a proxy
    const response = await axios.get("http://localhost:8080/api/user/profile");
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile", error);
    throw error;
  }
};
