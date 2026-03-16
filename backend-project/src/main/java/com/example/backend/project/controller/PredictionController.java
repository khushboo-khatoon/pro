package com.example.backend.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.backend.project.model.Prediction;
import com.example.backend.project.service.PredictionService;

import java.util.List;

@RestController
@RequestMapping("/api/predictions")
@CrossOrigin(origins = "http://localhost:5173")
public class PredictionController {

    @Autowired
    private PredictionService predictionService;

    @PostMapping
    public Prediction savePrediction(@RequestBody Prediction prediction){

        return predictionService.savePrediction(prediction);

    }

    @GetMapping("/{userId}")
    public List<Prediction> getPredictions(@PathVariable Long userId){

        return predictionService.getUserPredictions(userId);

    }

    @GetMapping("/latest/{userId}")
    public Prediction getLatestPrediction(@PathVariable Long userId){

        return predictionService.getLatestPrediction(userId);

    }
}