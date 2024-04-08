package com.gaurav.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gaurav.custom_exceptions.ResourceNotFoundException;
import com.gaurav.entities.Category;
import com.gaurav.repositories.CategoryRepository;

@Service
public class CategoryService {
	
	@Autowired
	CategoryRepository categoryRepository;
	
	public List<Category> getAllCategories(){
		return categoryRepository.findAll();
	}
	
	public Category addNewCategory(Category category) {
		return categoryRepository.save(category);
	}
	
	public Category findByCategoryID(Long id) {
		return categoryRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Category with ID:"+id+" not found"));
	}

}
