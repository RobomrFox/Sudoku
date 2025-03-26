package com.game.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Document(collection = "stats")
public class Stats {
    // We'll use userId as the unique Id, as it references the user
    @Id
    private String userId;
    private int gamePlayed;
    private int gameWon;
    private int streak;
    private int easyGamesWon;
    private int mediumGamesWon;
    private int hardGamesWon;
    private Date lastPlayed;

    public Stats() {}

    public Stats(String userId, int gamePlayed, int gameWon, int streak,
                 int easyGamesWon, int mediumGamesWon, int hardGamesWon, Date lastPlayed) {
        this.userId = userId;
        this.gamePlayed = gamePlayed;
        this.gameWon = gameWon;
        this.streak = streak;
        this.easyGamesWon = easyGamesWon;
        this.mediumGamesWon = mediumGamesWon;
        this.hardGamesWon = hardGamesWon;
        this.lastPlayed = lastPlayed;
    }

    // Getters and setters
    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }
    public int getGamePlayed() {
        return gamePlayed;
    }
    public void setGamePlayed(int gamePlayed) {
        this.gamePlayed = gamePlayed;
    }
    public int getGameWon() {
        return gameWon;
    }
    public void setGameWon(int gameWon) {
        this.gameWon = gameWon;
    }
    public int getStreak() {
        return streak;
    }
    public void setStreak(int streak) {
        this.streak = streak;
    }
    public int getEasyGamesWon() {
        return easyGamesWon;
    }
    public void setEasyGamesWon(int easyGamesWon) {
        this.easyGamesWon = easyGamesWon;
    }
    public int getMediumGamesWon() {
        return mediumGamesWon;
    }
    public void setMediumGamesWon(int mediumGamesWon) {
        this.mediumGamesWon = mediumGamesWon;
    }
    public int getHardGamesWon() {
        return hardGamesWon;
    }
    public void setHardGamesWon(int hardGamesWon) {
        this.hardGamesWon = hardGamesWon;
    }
    public Date getLastPlayed() {
        return lastPlayed;
    }
    public void setLastPlayed(Date lastPlayed) {
        this.lastPlayed = lastPlayed;
    }
}
