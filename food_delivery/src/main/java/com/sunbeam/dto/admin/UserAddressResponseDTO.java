package com.sunbeam.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserAddressResponseDTO {
	 private int id;
	    private int userId;
	    private String address;
	    private String locality;
	    private int cityId;
	    private int stateId;
	    private int countryId;
	    private double latitude;
	    private double longitude;
	    private String status;

}
