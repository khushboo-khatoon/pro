package com.example.backend.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.backend.project.model.User;
import com.example.backend.project.service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody User user) {

        User loggedUser = userService.loginUser(user.getEmail(), user.getPassword());

        if (loggedUser != null) {
            return loggedUser;
        }

        throw new RuntimeException("Invalid email or password");
    }
}
