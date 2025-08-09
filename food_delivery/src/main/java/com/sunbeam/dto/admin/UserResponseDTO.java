package com.sunbeam.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDTO {
	private Integer id;
    private String fullName;
    private String email;
    private String phoneNumber;
    private String status;
}
