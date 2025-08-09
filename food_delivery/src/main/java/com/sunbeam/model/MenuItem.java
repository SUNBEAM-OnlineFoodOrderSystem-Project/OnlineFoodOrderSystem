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
@Table(name = "menus")
public class MenuItem {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "restaurant_id", nullable = false)
	private Integer restaurantId;

	@Column(name = "category_id", nullable = false)
	private Integer categoryId;

	@Column(name = "item_name", length = 150, nullable = false)
	private String itemName;

	private String description;
	@Column(name = "image_url")
	private String imageUrl;

	@Column(nullable = false)
	private Float price;

	private Float rating;

	@Enumerated(EnumType.STRING)
	@Column(columnDefinition = "ENUM('active','inactive') default 'active'")
	private Status status;

	@Column(name = "created_at", insertable = false, updatable = false)
	private java.sql.Timestamp createdAt;

	@Column(name = "updated_at", insertable = false, updatable = true)
	private java.sql.Timestamp updatedAt;

	public enum Status {
		active, inactive
	}

}
