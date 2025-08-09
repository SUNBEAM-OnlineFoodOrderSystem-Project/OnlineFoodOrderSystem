package com.sunbeam.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderResponseDTO {
	private Integer id;
	private Integer userId;
	private Integer restaurantId;
	private Float totalAmount;
	private Float netAmount;
	private String status;

}
