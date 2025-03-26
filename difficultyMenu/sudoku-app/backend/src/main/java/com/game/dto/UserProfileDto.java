package com.game.dto;

import com.game.model.User;
import com.game.model.Stats;

public class UserProfileDto {
    private User user;   // Contains basic user info (userId, userName, dateJoined, etc.)
    private Stats stats; // Contains user game statistics (gamePlayed, gameWon, streak, etc.)

    // Default constructor is required by some frameworks
    public UserProfileDto() {}

    // Parameterized constructor for convenience
    public UserProfileDto(User user, Stats stats) {
        this.user = user;
        this.stats = stats;
    }

    // Getters and setters
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Stats getStats() {
        return stats;
    }

    public void setStats(Stats stats) {
        this.stats = stats;
    }
}
