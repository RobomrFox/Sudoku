import React, { useEffect, useState } from "react";
import { getUserProfile } from "../services/userService";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await getUserProfile();
      setProfile(response.user);
      setStats(response.stats);
    };

    fetchProfile();
  }, []);

  if (!profile || !stats) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="profile-page">
      <h1>Welcome, {profile.userName}</h1>
      <p>Member since: {new Date(profile.dateJoined).toLocaleDateString()}</p>

      <div className="profile-stats">
        <h2>Your Stats</h2>
        <ul>
          <li>Games Played: {stats.gamePlayed}</li>
          <li>Games Won: {stats.gameWon}</li>
          <li>Current Streak: {stats.streak}</li>
          <li>Easy Wins: {stats.easyGamesWon}</li>
          <li>Medium Wins: {stats.mediumGamesWon}</li>
          <li>Hard Wins: {stats.hardGamesWon}</li>
          <li>Last Played: {new Date(stats.lastPlayed).toLocaleString()}</li>
        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;
