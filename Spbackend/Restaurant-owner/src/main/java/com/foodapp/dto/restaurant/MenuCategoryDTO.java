package com.foodapp.dto.restaurant;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MenuCategoryDTO {

	private Long id;
	private String catName;
	private String status; // active/inactive
	

}