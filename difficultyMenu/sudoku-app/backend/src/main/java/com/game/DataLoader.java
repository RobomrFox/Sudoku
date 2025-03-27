package com.game;

import com.game.model.User;
import com.game.model.Stats;
import com.game.repository.StatsRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class DataLoader implements CommandLineRunner {

    private final UserRepository userRepository;
    private final StatsRepository statsRepository;

    public DataLoader(UserRepository userRepository, StatsRepository statsRepository) {
        this.userRepository = userRepository;
        this.statsRepository = statsRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Check if data already exists
        if (userRepository.count() == 0 && statsRepository.count() == 0) {
            // Create dummy user
            User user = new User("user1", "John Doe", new Date());
            userRepository.save(user);

            // Create dummy stats for that user
            Stats stats = new Stats("user1", 50, 30, 5, 20, 7, 3, new Date());
            statsRepository.save(stats);

            System.out.println("Dummy data loaded.");
        }
    }
}
