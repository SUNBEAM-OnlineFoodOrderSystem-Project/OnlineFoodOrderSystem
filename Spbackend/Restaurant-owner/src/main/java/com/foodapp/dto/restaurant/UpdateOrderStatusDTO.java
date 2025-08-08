package com.foodapp.dto.restaurant;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class UpdateOrderStatusDTO {

	 private Integer orderId;
	    private String status; 
	
	
	
	
}
