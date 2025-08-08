package com.foodapp.model;

//package com.foodapp.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "restaurants")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Restaurant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column(length = 100, nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String address;

    @Column(columnDefinition = "TEXT")
    private String locality;

    @Column(name = "city_id", nullable = false)
    private Integer cityId;

    @Column(name = "state_id", nullable = false)
    private Integer stateId;

    @Column(name = "country_id", nullable = false)
    private Integer countryId;

    private Float latitude;

    private Float longitude;

    private Float rating = 0f;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('active','inactive') DEFAULT 'active'")
    private Status status = Status.active;

    @Column(name = "is_accepting_orders")
    private Boolean isAcceptingOrders = true;

    public enum Status {
        active,
        inactive
    }
}


