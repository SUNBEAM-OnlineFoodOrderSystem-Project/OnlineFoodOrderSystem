package com.sunbeam.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MenuItemResponseDTO {
	private int id;
    private int restaurantId;
    private int categoryId;
    private String itemName;
    private String description;
    private String imageUrl;
    private double price;
    private double rating;
    private String status;

}
