package com.foodapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;


import com.foodapp.model.MenuCategory;

public interface MenuCategoryRepository extends JpaRepository<MenuCategory, Integer> {

	long count();
}