package com.example.backend.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.project.model.Prediction;

public interface PredictionRepository extends JpaRepository<Prediction, Long> {

    List<Prediction> findByUserId(Long userId);

    Prediction findTopByUserIdOrderByDateDesc(Long userId);

}