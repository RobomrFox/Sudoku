package com.game;

import com.game.model.User;
import com.game.model.Stats;
import com.game.repository.UserRepository;
import com.game.repository.StatsRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class DataLoader implements CommandLineRunner {

    private final UserRepository userRepository;
    private final StatsRepository statsRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public DataLoader(UserRepository userRepository, StatsRepository statsRepository) {
        this.userRepository = userRepository;
        this.statsRepository = statsRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Check if data already exists before loading dummy data
        if (userRepository.count() == 0 && statsRepository.count() == 0) {
            // Encode the raw password "1234"
            String encodedPassword = passwordEncoder.encode("1234");
            // Create dummy user with username "abc" and password "1234"
            User user = new User("user1", "abc", encodedPassword, new Date());
            userRepository.save(user);

            // Create dummy stats for that user
            Stats stats = new Stats("user1", 50, 30, 5, 20, 7, 3, new Date());
            statsRepository.save(stats);

            System.out.println("Dummy data loaded.");
        }
    }
}
