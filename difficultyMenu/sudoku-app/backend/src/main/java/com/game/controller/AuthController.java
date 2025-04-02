package com.game.controller;

import com.game.dto.UserLoginRequest;
import com.game.dto.UserRegisterRequest;
import com.game.service.UserService;
import java.util.HashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173") // adjust or remove if needed
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerUser(@RequestBody UserRegisterRequest request) {
        try {
            String response = userService.registerUser(
                    request.getUserName(),
                    request.getEmail(),
                    request.getPassword());
            Map<String, String> body = new HashMap<>();
            body.put("msg", response); // e.g., "User registered successfully"
            return ResponseEntity.ok(body);
        } catch (Exception e) {
            Map<String, String> body = new HashMap<>();
            body.put("msg", "Registration failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginUser(@RequestBody UserLoginRequest request) {
        try {
            boolean valid = userService.loginUser(request.getUserName(), request.getPassword());
            Map<String, String> body = new HashMap<>();
            if (valid) {
                body.put("msg", "Login successful");
                return ResponseEntity.ok(body);
            } else {
                body.put("msg", "Invalid credentials");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(body);
            }
        } catch (Exception e) {
            Map<String, String> body = new HashMap<>();
            body.put("msg", "Login failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);
        }
    }
}
