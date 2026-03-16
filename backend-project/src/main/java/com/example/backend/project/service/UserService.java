package com.example.backend.project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.backend.project.model.User;
import com.example.backend.project.repository.UserRepository;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    public String registerUser(User user) {

        if(userRepository.existsByEmail(user.getEmail())) {
            return "Email already exists";
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(user);

        return "User registered successfully";
    }

    public User loginUser(String email, String password) {

        Optional<User> user = userRepository.findByEmail(email);

        if (user.isPresent()) {

            if (passwordEncoder.matches(password, user.get().getPassword())) {
                return user.get();
            }

        }

        return null;
    }
}
