package com.game.service;

import com.game.dto.UserProfileDto;
import com.game.model.User;
import com.game.model.Stats;
import com.game.repository.StatsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final StatsRepository statsRepository;
    private final BCryptPasswordEncoder passwordEncoder =
            new BCryptPasswordEncoder();

    @Autowired
    public UserService(UserRepository userRepository,
                       StatsRepository statsRepository) {
        this.userRepository = userRepository;
        this.statsRepository = statsRepository;
    }

    // Authentication methods
    public String registerUser(String userName, String password) {
        if (userRepository.findByUserName(userName) != null) {
            return "Username already exists";
        }
        String encodedPassword = passwordEncoder.encode(password);
        User user = new User(null, userName, encodedPassword, new Date());
        userRepository.save(user);
        return "User registered successfully";
    }

    public boolean loginUser(String userName, String password) {
        User user = userRepository.findByUserName(userName);
        return user != null && passwordEncoder.matches(password, user.getPassword());
    }

    // User profile method
    public UserProfileDto getUserProfile(String userId) {
        User user = userRepository.findById(userId).orElse(null);
        Stats stats = statsRepository.findById(userId).orElse(null);
        return new UserProfileDto(user, stats);
    }
}
