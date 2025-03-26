package com.game.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.game.model.Game;

@Repository
public interface GameRepository extends MongoRepository<Game, String> {
    Optional<Game> findByGameId(String gameId);
    
    // Add this method to fix the compilation error
    List<Game> findByUserId(String userId);
}