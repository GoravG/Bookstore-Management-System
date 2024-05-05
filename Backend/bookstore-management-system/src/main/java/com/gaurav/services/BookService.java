package com.gaurav.services;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gaurav.custom_exceptions.ResourceNotFoundException;
import com.gaurav.dtos.BookDetailsDTO;
import com.gaurav.dtos.BookTitleDTO;
import com.gaurav.entities.Book;
import com.gaurav.repositories.BookRepository;

@Service
public class BookService {
	@Autowired
	BookRepository bookRepo;

	@Autowired
	ModelMapper mapper;

	public Book addNewBook(Book book) {
		Book saved = bookRepo.save(book);
		return saved;
	}

	public List<BookTitleDTO> getAllBookTitles() {
		return bookRepo.findAll().stream().map((book) -> mapper.map(book, BookTitleDTO.class)).toList();
	}

	public Book findById(Long bookId) {
		return bookRepo.findById(bookId)
				.orElseThrow(() -> new ResourceNotFoundException("Book with ID:" + bookId + " not found"));
	}

	public List<BookDetailsDTO> getByTitle(String title) {
		return bookRepo.findByTitle(title).stream().toList();

	}
}
