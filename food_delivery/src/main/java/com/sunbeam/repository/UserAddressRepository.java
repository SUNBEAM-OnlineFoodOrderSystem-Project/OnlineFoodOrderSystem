package com.sunbeam.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeam.model.Address;

public interface UserAddressRepository extends JpaRepository<Address, Integer> {

}
