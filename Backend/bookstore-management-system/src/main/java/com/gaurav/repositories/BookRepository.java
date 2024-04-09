package com.gaurav.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.gaurav.dtos.BookTitleDTO;
import com.gaurav.entities.Book;

public interface BookRepository extends JpaRepository<Book, Long>{
	
	@Query(value = "SELECT b.id, b.title FROM Book b")
	List<Book> getAllTitles();
	
}
