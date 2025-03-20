package com.game.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.game.model.SudokuBoard;
import com.game.service.SudokuService;

// Marks this class as a REST controller - handles HTTP requests
@RestController
// Enables Cross-Origin Resource Sharing (CORS) for all origins
@CrossOrigin(origins = "*")
// Base URL mapping for all endpoints in this controller
@RequestMapping("/api/sudoku")
public class SudokuController {
    // Dependency injection of SudokuService
    private final SudokuService sudokuService;

    // Constructor injection for SudokuService
    public SudokuController(SudokuService sudokuService) {
        this.sudokuService = sudokuService;
    }

    // Handles GET requests to /api/sudoku/generate/{difficulty}
    // {difficulty} is a path variable that can be 'easy', 'medium', or 'hard'
    @GetMapping("/generate/{difficulty}")
    public SudokuBoard generatePuzzle(@PathVariable String difficulty) {
        System.out.println("Received request for difficulty: " + difficulty); // Debug log
        return sudokuService.generatePuzzle(difficulty); // Delegates puzzle generation to service layer
    }
}