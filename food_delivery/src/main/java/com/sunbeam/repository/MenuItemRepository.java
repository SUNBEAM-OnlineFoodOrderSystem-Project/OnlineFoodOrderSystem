package com.sunbeam.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeam.model.MenuItem;

public interface MenuItemRepository extends JpaRepository<MenuItem, Integer> {

}
