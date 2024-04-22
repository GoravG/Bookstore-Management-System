package com.gaurav.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.gaurav.dtos.BookCardDTO;
import com.gaurav.dtos.BookDetailsDTO;
import com.gaurav.entities.Book;

public interface BookRepository extends JpaRepository<Book, Long> {

	@Query(value = "SELECT b.id, b.title FROM Book b")
	List<Book> getAllTitles();

	@Query(value = "SELECT new com.gaurav.dtos.BookDetailsDTO(b.id, b.isbn, b.title, b.author, b.description , b.noOfPages, b.coverImage) FROM Book b where b.title=?1")
	List<BookDetailsDTO> findByTitle(String title);
}
