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
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "user_addresses")
public class Address {
	 @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Integer id;

	    @Column(name = "user_id", nullable = false)
	    private Integer userId;

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

	    @Enumerated(EnumType.STRING)
	    @Column(columnDefinition = "ENUM('active','inactive') default 'active'")
	    private Status status;

	    @Column(name = "created_at", insertable = false, updatable = false)
	    private java.sql.Timestamp createdAt;

	    @Column(name = "updated_at", insertable = false, updatable = true)
	    private java.sql.Timestamp updatedAt;

	    public enum Status { active, inactive }

}
