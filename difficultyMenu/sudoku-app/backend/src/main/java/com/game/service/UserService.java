package com.game.service;

import com.game.model.User;
import com.game.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

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
        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            return true;
        }
        return false;
    }
}