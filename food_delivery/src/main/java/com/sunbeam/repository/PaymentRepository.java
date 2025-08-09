package com.sunbeam.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeam.model.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {

}
