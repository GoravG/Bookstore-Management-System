package com.gaurav.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gaurav.entities.Book;
import com.gaurav.entities.Inventory;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {
	Optional<Inventory> findByBook(Book book);
	
	Optional<Inventory> findByBookId(Long id);
	
	void deleteById(Long id);
}
