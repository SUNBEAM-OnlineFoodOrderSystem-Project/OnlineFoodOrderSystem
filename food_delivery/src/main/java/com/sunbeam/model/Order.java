package com.sunbeam.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer userId;
    private Integer restaurantId;
    private Float totalAmount;
    private Float netAmount;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('placed','accepted','preparing','prepared','picked','delivered')")
    private OrderStatus status;

    public enum OrderStatus {
        placed, accepted, preparing, prepared, picked, delivered
    }
}
