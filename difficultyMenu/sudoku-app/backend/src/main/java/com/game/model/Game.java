package com.game.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Document(collection = "game")
public class Game {
    @Id
    private String gameId;
    private String userId;    // Foreign key to User
    private String puzzleId;  // Foreign key to Puzzle
    private Date startTime;
    private Date completionTime;
    private String status;
    private String currentGrid; // JSON representation of the game state

    public Game() {}

    public Game(String gameId, String userId, String puzzleId, Date startTime,
                Date completionTime, String status, String currentGrid) {
        this.gameId = gameId;
        this.userId = userId;
        this.puzzleId = puzzleId;
        this.startTime = startTime;
        this.completionTime = completionTime;
        this.status = status;
        this.currentGrid = currentGrid;
    }

    // Getters and setters
    public String getGameId() {
        return gameId;
    }
    public void setGameId(String gameId) {
        this.gameId = gameId;
    }
    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }
    public String getPuzzleId() {
        return puzzleId;
    }
    public void setPuzzleId(String puzzleId) {
        this.puzzleId = puzzleId;
    }
    public Date getStartTime() {
        return startTime;
    }
    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }
    public Date getCompletionTime() {
        return completionTime;
    }
    public void setCompletionTime(Date completionTime) {
        this.completionTime = completionTime;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public String getCurrentGrid() {
        return currentGrid;
    }
    public void setCurrentGrid(String currentGrid) {
        this.currentGrid = currentGrid;
    }
}
