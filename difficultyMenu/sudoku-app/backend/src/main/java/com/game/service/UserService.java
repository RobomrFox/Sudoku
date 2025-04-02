package com.game.service;

import com.game.dto.UserProfileDto;
import com.game.model.User;
import com.game.model.Stats;
import com.game.repository.StatsRepository;
import com.game.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final StatsRepository statsRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Autowired
    public UserService(UserRepository userRepository,
                       StatsRepository statsRepository) {
        this.userRepository = userRepository;
        this.statsRepository = statsRepository;
    }

    // Updated registration method to include email in the parameters
    public String registerUser(String userName, String email, String password) {
        // Check if the username already exists
        if (userRepository.findByUserName(userName) != null) {
            return "Username already exists";
        }
        // Check if the email is already registered
        if (userRepository.findByEmail(email) != null) {
            return "Email already exists";
        }
        String encodedPassword = passwordEncoder.encode(password);
        // Create a new User with an email field included
        User user = new User(null, userName, email, encodedPassword, new Date());
        userRepository.save(user);
        return "User registered successfully";
    }

    public boolean loginUser(String userName, String password) {
        User user = userRepository.findByUserName(userName);
        return user != null && passwordEncoder.matches(password, user.getPassword());
    }

    public UserProfileDto getUserProfile(String userId) {
        User user = userRepository.findById(userId).orElse(null);
        Stats stats = statsRepository.findById(userId).orElse(null);
        return new UserProfileDto(user, stats);
    }
}
