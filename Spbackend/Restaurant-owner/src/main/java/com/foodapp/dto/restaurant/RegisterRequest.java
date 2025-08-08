package com.foodapp.dto.restaurant;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor



public class RegisterRequest {

	private String email;
    private String password;
    private String fullName;
    private String phoneNumber;
	
		
}
