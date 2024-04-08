package com.gaurav.controllers;

import java.io.IOException;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gaurav.dtos.BookDTO;
import com.gaurav.dtos.CategoryDTO;
import com.gaurav.dtos.UserSignIn;
import com.gaurav.entities.Book;
import com.gaurav.entities.Category;
import com.gaurav.security.JwtUtils;
import com.gaurav.services.BookService;
import com.gaurav.services.CategoryService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("*")
public class AdminController {

	@Autowired
	ModelMapper mapper;

	@Autowired
	BookService bookService;

	@Autowired
	CategoryService categoryService;

	@Autowired
	AuthenticationManager mgr;

	@Autowired
	JwtUtils utils;

	@PostMapping("/signin")
	public ResponseEntity<?> adminSignIn(@Valid @RequestBody UserSignIn req) {
		Authentication verifiedAuth = mgr
				.authenticate(new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword()));
		if (verifiedAuth.getAuthorities().iterator().next().getAuthority() != "ADMIN") {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You are not an admin");
		}
		return ResponseEntity.ok(utils.generateJwtToken(verifiedAuth));
	}

	@PostMapping("/add_book")
	public ResponseEntity<?> addBook(BookDTO req) throws IOException {
		System.out.println("In Add Book");
		Book book = new Book();
		book.setIsbn(req.getIsbn());
		book.setAuthor(req.getAuthor());
		book.setTitle(req.getTitle());
		book.setDescription(req.getDescription());
		book.setNoOfPages(req.getNoOfPages());
		book.setCoverImage(req.getCoverImage().getBytes());
		Category cat=categoryService.findByCategoryID(Long.parseLong(req.getCategoryId()));
		book.setCategory(cat);
		Book saved = bookService.addNewBook(book);
		if (saved != null)
			return ResponseEntity.status(HttpStatus.CREATED).body("Added " + book.getTitle() + " to database");
		else
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body("Unable to add " + book.getTitle() + " to database");

	}

	@PostMapping("/add_category")
	public ResponseEntity<?> addCategory(@Valid @RequestBody CategoryDTO req) {
		Category cat = mapper.map(req, Category.class);
		Category added = categoryService.addNewCategory(cat);
		if (added != null)
			return ResponseEntity.status(HttpStatus.CREATED).body("Added " + added.getName() + " as new category");
		else
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body("Unable to add " + req.getName() + " as new category");
	}

}
