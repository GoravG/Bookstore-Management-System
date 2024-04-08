package com.gaurav.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gaurav.entities.Book;

public interface BookRepository extends JpaRepository<Book, Long>{
	

}
