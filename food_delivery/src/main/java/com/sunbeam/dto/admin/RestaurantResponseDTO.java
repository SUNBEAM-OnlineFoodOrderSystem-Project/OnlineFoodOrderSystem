package com.sunbeam.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RestaurantResponseDTO {
	private Integer id;
    private String name;
    private Float rating;
    private String status;

}
