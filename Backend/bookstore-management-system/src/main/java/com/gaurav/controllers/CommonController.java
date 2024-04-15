package com.gaurav.controllers;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gaurav.dtos.BookCardDTO;
import com.gaurav.dtos.BookDetailsDTO;
import com.gaurav.dtos.BookTitleDTO;
import com.gaurav.dtos.BookTitleSearchDTO;
import com.gaurav.dtos.CategoryDTO;
import com.gaurav.dtos.OrderDTO;
import com.gaurav.dtos.OrderItemDTO;
import com.gaurav.services.BookService;
import com.gaurav.services.CategoryService;
import com.gaurav.services.InventoryService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/commons")
@CrossOrigin("*")
public class CommonController {

	@Autowired
	ModelMapper mapper;

	@Autowired
	CategoryService categoryService;
	
	@Autowired
	InventoryService inventoryService;

	@Autowired
	BookService bookService;

	@GetMapping("/categories")
	public List<CategoryDTO> getAllCategories() {
		return categoryService.getAllCategories().stream().map((category) -> mapper.map(category, CategoryDTO.class))
				.toList();
	}

	@GetMapping("/titles")
	public List<BookTitleDTO> getAllBookTitles() {
		return bookService.getAllBookTitles();
	}

	@PostMapping("/get_by_title")
	public ResponseEntity<?> getBookByTitle(@Valid @RequestBody BookTitleSearchDTO req) {
		List<BookDetailsDTO> list = bookService.getByTitle(req.getTitle());
		if (list.size() == 0)
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No books with provided title found");
		else
			return ResponseEntity.status(HttpStatus.OK).body(list);
	}

	@GetMapping("/category/{categoryId}")
	public ResponseEntity<?> getBooksByCategoryId(@PathVariable Long categoryId) {
		List<BookCardDTO> list = categoryService.findDetailsByCategoryID(categoryId);
		return ResponseEntity.status(HttpStatus.OK).body(list);
	}
	
	@GetMapping("/discover")
	public ResponseEntity<?> getBooksInInventory(){
		List<BookCardDTO> allBooks = inventoryService.getAllBooks();
		return ResponseEntity.status(HttpStatus.OK).body(allBooks);
	}
}
