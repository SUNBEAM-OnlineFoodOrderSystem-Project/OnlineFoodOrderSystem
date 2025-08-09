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



@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "restaurants")
public class Restaurant {
	
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Integer id;

	    @Column(name = "user_id", nullable = false)
	    private Integer userId; // Owner

	    private String name;
	    private String address;
	    private String locality;

	    @Column(name = "city_id")
	    private Integer cityId;

	    @Column(name = "state_id")
	    private Integer stateId;

	    @Column(name = "country_id")
	    private Integer countryId;

	    private Float latitude;
	    private Float longitude;
	    private Float rating;

	    @Enumerated(EnumType.STRING)
	    @Column(columnDefinition = "ENUM('active','inactive') default 'active'")
	    private Status status;

	    @Column(name = "is_accepting_orders")
	    private Integer isAcceptingOrders;

	    public enum Status {
	        active, inactive
	    }

}
