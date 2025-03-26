package com.game.controller;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.game.model.Game;
import com.game.repository.GameRepository;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/games")
public class GameController {

    @Autowired
    private GameRepository gameRepository;
    
    private ObjectMapper objectMapper = new ObjectMapper();

    // Create a new game
    @PostMapping("/start")
    public ResponseEntity<?> startGame(@RequestBody Map<String, Object> payload) {
        try {
            System.out.println("Received payload: " + payload);
            
            String userId = (String) payload.get("userId");
            String puzzleId = (String) payload.get("puzzleId");
            Object initialGrid = payload.get("initialGrid");
            
            System.out.println("userId: " + userId);
            System.out.println("puzzleId: " + puzzleId);
            System.out.println("initialGrid: " + initialGrid);
            
            // Create a new game ID if not provided
            String gameId = UUID.randomUUID().toString();
            
            Game game = new Game();
            game.setGameId(gameId);
            game.setUserId(userId);
            game.setPuzzleId(puzzleId);
            game.setStartTime(new Date());
            game.setStatus("in_progress");
            
            // Make sure initialGrid is a string
            String gridStr = initialGrid instanceof String ? 
                            (String) initialGrid : 
                            new ObjectMapper().writeValueAsString(initialGrid);
            
            game.setCurrentGrid(gridStr);
            
            Game savedGame = gameRepository.save(game);
            return ResponseEntity.ok(savedGame);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error starting game: " + e.getMessage());
        }
    }
    
    // Update game state (save after each move)
    @PostMapping("/save")
    public ResponseEntity<?> saveGame(@RequestBody Map<String, Object> payload) {
        try {
            String gameId = (String) payload.get("gameId");
            Object boardObj = payload.get("board");
            boolean completed = payload.containsKey("completed") && (Boolean) payload.get("completed");
            
            // Convert board to JSON string
            String currentGrid = objectMapper.writeValueAsString(boardObj);
            
            // Find the game
            Optional<Game> gameOpt = gameRepository.findByGameId(gameId);
            if (!gameOpt.isPresent()) {
                return ResponseEntity.notFound().build();
            }
            
            // Update the game
            Game game = gameOpt.get();
            game.setCurrentGrid(currentGrid);
            
            if (completed) {
                game.setStatus("completed");
                game.setCompletionTime(new Date());
            }
            
            Game savedGame = gameRepository.save(game);
            return ResponseEntity.ok(savedGame);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error saving game: " + e.getMessage());
        }
    }
    
    // Get game by ID
    @GetMapping("/{gameId}")
    public ResponseEntity<?> getGame(@PathVariable String gameId) {
        Optional<Game> gameOpt = gameRepository.findByGameId(gameId);
        if (gameOpt.isPresent()) {
            return ResponseEntity.ok(gameOpt.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Get all games for a user
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserGames(@PathVariable String userId) {
        List<Game> games = gameRepository.findByUserId(userId);
        return ResponseEntity.ok(games);
    }
}