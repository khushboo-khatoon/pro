package com.example.backend_project.controller;

import com.example.backend_project.model.Prediction;
import com.example.backend_project.repository.PredictionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/predictions")
@CrossOrigin(origins = "http://localhost:5173")
public class PredictionController {

@Autowired
private PredictionRepository predictionRepository;

@GetMapping("/{userId}")
public List<Prediction> getPredictions(@PathVariable Long userId) {

return predictionRepository.findByUserId(userId);

}

}
