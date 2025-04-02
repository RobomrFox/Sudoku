import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { getUserProfile } from "../services/userService";
import "./profile.css";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Assuming getUserProfile fetches data for the currently "logged in" user
        // You might need to pass a user ID or token depending on your setup
        const response = await getUserProfile();
        if (response && response.user && response.stats) {
          setProfile(response.user);
          setStats(response.stats);
        } else {
          // Handle case where profile data isn't returned correctly
          console.error("Failed to load profile data.");
          // Optionally redirect to login if profile load fails
          // navigate('/login');
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        // Handle error, maybe redirect to login
        // navigate('/login');
      }
    };

    fetchProfile();
  }, [navigate]); // Add navigate to dependency array if used inside useEffect for redirection

  if (!profile || !stats) {
    return <div className="profile-loading">Loading profile...</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h1 className="profile-title">Welcome, {profile.userName}</h1>
        <p className="profile-date">
          Member since: {new Date(profile.dateJoined).toLocaleDateString()}
        </p>

        <div className="profile-stats">
          <h2>Your Stats</h2>
          <ul>
            <li>Games Played: {stats.gamePlayed}</li>
            <li>Games Won: {stats.gameWon}</li>
            <li>Current Streak: {stats.streak}</li>
            <li>Easy Wins: {stats.easyGamesWon}</li>
            <li>Medium Wins: {stats.mediumGamesWon}</li>
            <li>Hard Wins: {stats.hardGamesWon}</li>
            <li>
              Last Played: {new Date(stats.lastPlayed).toLocaleString()}
            </li>
          </ul>
        </div>

        {/* Container for the buttons */}
        <div className="profile-buttons">
          <button
            className="profile-action-btn" // Use a common class for styling
            onClick={() => navigate("/")} // Navigate to Game Page (root path)
          >
            Back to Game
          </button>
          <button
            className="profile-action-btn" // Use a common class for styling
            onClick={() => navigate("/login")}
          >
            Another Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
