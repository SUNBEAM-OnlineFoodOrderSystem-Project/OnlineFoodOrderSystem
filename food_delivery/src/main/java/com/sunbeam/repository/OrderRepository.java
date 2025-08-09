package com.sunbeam.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeam.model.Order;

public interface OrderRepository extends JpaRepository<Order, Integer> {

}
