package com.sunbeam.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeam.model.Restaurant;

public interface RestaurantRepository extends JpaRepository<Restaurant, Integer> {

}
