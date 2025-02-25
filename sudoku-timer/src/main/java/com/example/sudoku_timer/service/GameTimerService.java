package com.example.sudoku_timer.service;

import com.example.sudoku_timer.entity.GameTimer;
import com.example.sudoku_timer.repository.GameTimerRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class GameTimerService {

    private final GameTimerRepository gameTimerRepository;

    public GameTimerService(GameTimerRepository gameTimerRepository) {
        this.gameTimerRepository = gameTimerRepository;
    }

    // Check if a timer exists by ID
    public boolean existsById(String id) {
        return gameTimerRepository.existsById(id);
    }

    // Delete a timer
    public void deleteTimer(String id) {
        if (!gameTimerRepository.existsById(id)) {
            throw new RuntimeException("Timer with ID " + id + " not found");
        }
        gameTimerRepository.deleteById(id);
    }

    // Start a new timer
    public GameTimer startTimer(String playerName) {
        GameTimer timer = new GameTimer();
        timer.setPlayerName(playerName);
        timer.setStartTime(LocalDateTime.now());
        return gameTimerRepository.save(timer);
    }

    // Stop a timer
    public GameTimer stopTimer(String id) {
        GameTimer timer = gameTimerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Timer not found"));
        timer.setEndTime(LocalDateTime.now());
        timer.setDuration(java.time.Duration.between(timer.getStartTime(), timer.getEndTime()).getSeconds());
        return gameTimerRepository.save(timer);
    }

    // Get all timers
    public List<GameTimer> getAllTimers() {
        return gameTimerRepository.findAll();
    }

    // Get a timer by ID
    public GameTimer getTimerById(String id) {
        return gameTimerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Timer not found"));
    }
}
