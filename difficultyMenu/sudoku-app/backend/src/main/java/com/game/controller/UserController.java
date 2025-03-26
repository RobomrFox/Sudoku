package com.game.controller;

import com.game.dto.UserProfileDto;
import com.game.service.UserService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    // Constructor injection for UserService
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // GET endpoint for fetching the user profile at /api/user/profile
    @GetMapping("/profile")
    public UserProfileDto getUserProfile() {
        // Hardcoded user ID for demonstration.
        // In a real application, this should be retrieved from the authentication context.
        String userId = "user1";
        return userService.getUserProfile(userId);
    }
}
