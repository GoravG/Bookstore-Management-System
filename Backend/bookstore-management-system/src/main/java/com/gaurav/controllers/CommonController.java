package com.gaurav.controllers;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gaurav.dtos.CategoryDTO;
import com.gaurav.services.CategoryService;

@RestController
@RequestMapping("/api/commons")
@CrossOrigin("*")
public class CommonController {

	@Autowired
	ModelMapper mapper;

	@Autowired
	CategoryService categoryService;

	@GetMapping("/categories")
	public List<CategoryDTO> getAllCategories() {
		return categoryService.getAllCategories().stream().map((category) -> mapper.map(category, CategoryDTO.class))
				.toList();
	}
}
