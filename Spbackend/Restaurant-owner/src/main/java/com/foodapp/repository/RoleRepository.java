package com.foodapp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.foodapp.model.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByRoleName(String roleName);
}

