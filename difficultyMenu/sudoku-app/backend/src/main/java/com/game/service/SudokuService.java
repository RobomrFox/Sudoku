package com.game.service;

import com.game.model.SudokuBoard;
import org.springframework.stereotype.Service;

@Service
public class SudokuService {
    public SudokuBoard generatePuzzle(String difficulty) {
        System.out.println("Generating puzzle for difficulty: " + difficulty); // Debug log
        // Create a simple test board
        int[][] board = new int[9][9];
        // Fill with some test data
        board[0][0] = 5;
        board[0][1] = 3;
        return new SudokuBoard(board, difficulty);
    }
}