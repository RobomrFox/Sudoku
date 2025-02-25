package com.example.sudoku_timer.controller;

import com.example.sudoku_timer.entity.GameTimer;
import com.example.sudoku_timer.service.GameTimerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/timers") // Base URL for all endpoints
public class GameTimerController {

    @Autowired
    private GameTimerService gameTimerService;

    // Start a new timer
    @PostMapping
    public GameTimer startTimer(@RequestParam String playerName) {
        return gameTimerService.startTimer(playerName);
    }

    // Stop a timer
    @PutMapping("/{id}")
    public GameTimer stopTimer(@PathVariable String id) {
        return gameTimerService.stopTimer(id);
    }

    // Get all timers
    @GetMapping
    public List<GameTimer> getAllTimers() {
        return gameTimerService.getAllTimers();
    }

    // Get a timer by ID
    @GetMapping("/{id}")
    public GameTimer getTimerById(@PathVariable String id) {
        return gameTimerService.getTimerById(id);
    }

    // Delete a timer
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTimer(@PathVariable String id) {
        if (!gameTimerService.existsById(id)) { // Check if the timer exists
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Timer not found");
        }
        gameTimerService.deleteTimer(id); // Delete the timer
        return ResponseEntity.ok("Timer deleted successfully");
    }
}
