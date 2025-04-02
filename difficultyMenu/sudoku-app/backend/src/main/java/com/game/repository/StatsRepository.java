package com.game.repository;

import com.game.model.Stats;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StatsRepository extends MongoRepository<Stats, String> {
    // Add custom query methods if needed.
}
