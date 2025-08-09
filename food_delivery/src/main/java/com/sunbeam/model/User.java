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


@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
public class User {
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Integer id;

	    @Column(name = "role_id", nullable = false)
	    private Integer roleId;

	    @Column(name = "full_name")
	    private String fullName;

	    @Column(name = "email", unique = true)
	    private String email;

	    @Column(name = "phone_number", unique = true)
	    private String phoneNumber;

	    @Enumerated(EnumType.STRING)
	    @Column(columnDefinition = "ENUM('inactive','active','blocked') default 'inactive'")
	    private Status status;

	    @Column(name = "phone_verified_at")
	    private java.sql.Timestamp phoneVerifiedAt;

	    @Column(name = "email_verified_at")
	    private java.sql.Timestamp emailVerifiedAt;

	    @Column(name = "created_at", insertable = false, updatable = false)
	    private java.sql.Timestamp createdAt;

	    @Column(name = "updated_at", insertable = false, updatable = true)
	    private java.sql.Timestamp updatedAt;

	    public enum Status {
	        inactive, active, blocked
	    }

}
