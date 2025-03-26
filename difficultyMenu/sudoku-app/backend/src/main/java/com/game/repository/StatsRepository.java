package com.game.repository;

import com.game.model.Stats;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface StatsRepository extends MongoRepository<Stats, String> {
    // Add custom query methods here if required
}
