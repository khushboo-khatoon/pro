package com.example.backend.project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.project.model.Prediction;
import com.example.backend.project.repository.PredictionRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PredictionService {

    @Autowired
    private PredictionRepository predictionRepository;

    public Prediction savePrediction(Prediction prediction){

        prediction.setDate(LocalDateTime.now());

        return predictionRepository.save(prediction);

    }

    public List<Prediction> getUserPredictions(Long userId){

        return predictionRepository.findByUserId(userId);

    }

    public Prediction getLatestPrediction(Long userId){

        return predictionRepository.findTopByUserIdOrderByDateDesc(userId);

    }
}