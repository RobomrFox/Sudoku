package com.game.model;

/**
 * Represents a Sudoku game board with difficulty level
 */
public class SudokuBoard {
    // 2D array to store the Sudoku puzzle numbers (9x9 grid)
    private int[][] board;
    
    // Difficulty level of the puzzle (easy, medium, hard)
    private String difficulty;

    /**
     * Constructor to create a new SudokuBoard
     * @param board 9x9 grid of numbers
     * @param difficulty difficulty level of the puzzle
     */
    public SudokuBoard(int[][] board, String difficulty) {
        this.board = board;
        this.difficulty = difficulty;
    }

    /**
     * @return the current state of the Sudoku board
     */
    public int[][] getBoard() {
        return board;
    }

    /**
     * Updates the Sudoku board state
     * @param board new board state to set
     */
    public void setBoard(int[][] board) {
        this.board = board;
    }

    /**
     * @return current difficulty level
     */
    public String getDifficulty() {
        return difficulty;
    }

    /**
     * Updates the difficulty level
     * @param difficulty new difficulty level to set
     */
    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }
}