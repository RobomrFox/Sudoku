package com.game.controller;

import com.game.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public String registerUser(@RequestParam String userName,
                               @RequestParam String password) {
        return userService.registerUser(userName, password);
    }

    @PostMapping("/login")
    public String loginUser(@RequestParam String userName,
                            @RequestParam String password) {
        if (userService.loginUser(userName, password)) {
            return "Login successful";
        }
        return "Invalid credentials";
    }
}
