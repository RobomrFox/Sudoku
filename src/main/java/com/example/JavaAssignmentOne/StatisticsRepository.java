package com.example.JavaAssignmentOne;

import jdk.jshell.StatementSnippet;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface StatisticsRepository extends MongoRepository<Statistics, Integer> {
    public Statistics findByuserName(String userName);
    public Statistics deleteByuserName(String userName);
}
