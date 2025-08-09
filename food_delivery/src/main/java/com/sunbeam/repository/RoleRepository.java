package com.sunbeam.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeam.model.Role;

public interface RoleRepository extends JpaRepository<Role, Integer> {

}
