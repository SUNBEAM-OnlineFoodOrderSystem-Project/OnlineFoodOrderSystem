package com.foodapp.service.restaurant;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.foodapp.model.MenuCategory;
import com.foodapp.repository.MenuCategoryRepository;

@Service
public class MenuCategoryServiceImpl {

	
//	  @Autowired
//	  private MenuCategoryRepository categoryRepo;
//	  
	  @Autowired
	    private MenuCategoryRepository repository;

	    public List<MenuCategory> getAllCategories() {
	        return repository.findAll();
	    }

	    public Optional<MenuCategory> getCategoryById(Integer id) {
	        return repository.findById(id);
	    }

	    public MenuCategory saveCategory(MenuCategory category) {
	        return repository.save(category);
	    }

	    public void deleteCategory(Integer id) {
	        repository.deleteById(id);
	    }
	  
	  
}