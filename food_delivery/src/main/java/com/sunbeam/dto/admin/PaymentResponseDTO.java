package com.sunbeam.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentResponseDTO {
	private int id;
	private int orderId;
	private double amount;
	private String paymentMode;
	private String paymentStatus;

}
