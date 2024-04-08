package com.gaurav.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gaurav.entities.Book;
import com.gaurav.repositories.BookRepository;

@Service
public class BookService {
	@Autowired
	BookRepository bookRepo;
	
	public Book addNewBook(Book book) {
		Book saved=bookRepo.save(book);
		return saved;
	}

}
