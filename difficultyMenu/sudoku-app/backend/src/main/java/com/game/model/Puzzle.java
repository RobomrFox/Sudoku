package com.game.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "puzzle")
public class Puzzle {
    @Id
    private String puzzleId;
    private String difficulty;
    private String grid; // stored as a JSON string

    public Puzzle() {}

    public Puzzle(String puzzleId, String difficulty, String grid) {
        this.puzzleId = puzzleId;
        this.difficulty = difficulty;
        this.grid = grid;
    }

    // Getters and setters
    public String getPuzzleId() {
        return puzzleId;
    }
    public void setPuzzleId(String puzzleId) {
        this.puzzleId = puzzleId;
    }
    public String getDifficulty() {
        return difficulty;
    }
    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }
    public String getGrid() {
        return grid;
    }
    public void setGrid(String grid) {
        this.grid = grid;
    }
}
