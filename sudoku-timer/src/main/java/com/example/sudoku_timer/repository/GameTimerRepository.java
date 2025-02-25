package com.example.sudoku_timer.repository;

import com.example.sudoku_timer.entity.GameTimer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameTimerRepository extends MongoRepository<GameTimer, String> {
    // No code needed here! Spring handles CRUD operations automatically.
}
