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
@Table(name = "order_payments")
public class Payment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "order_id", nullable = false)
	private Integer orderId;

	private Float amount;

	@Enumerated(EnumType.STRING)
	@Column(columnDefinition = "ENUM('UPI','COD','Debit','Credit')")
	private PaymentMode paymentMode;

	@Column(name = "payment_response")
	private String paymentResponse;

	@Enumerated(EnumType.STRING)
	@Column(columnDefinition = "ENUM('success','failed')")
	private PaymentStatus paymentStatus;

	@Column(name = "created_at", insertable = false, updatable = false)
	private java.sql.Timestamp createdAt;

	@Column(name = "updated_at", insertable = false, updatable = true)
	private java.sql.Timestamp updatedAt;

	public enum PaymentMode {
		UPI, COD, Debit,Credit
	}

	public enum PaymentStatus {
		success, failed
	}

}
