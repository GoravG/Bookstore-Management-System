package com.gaurav.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gaurav.custom_exceptions.ResourceNotFoundException;
import com.gaurav.dtos.BookCardDTO;
import com.gaurav.entities.Category;
import com.gaurav.entities.Inventory;
import com.gaurav.repositories.CategoryRepository;

@Service
public class CategoryService {

	@Autowired
	CategoryRepository categoryRepository;

	public List<Category> getAllCategories() {
		return categoryRepository.findAll();
	}

	public Category addNewCategory(Category category) {
		return categoryRepository.save(category);
	}
	
	public Category findByCategoryID(Long id) {
		return categoryRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Category with ID:" + id + " not found"));
	}

	public List<BookCardDTO> findDetailsByCategoryID(Long id) {
		Category category= categoryRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Category with ID:" + id + " not found"));
		return category.getBookList().stream().map((book) -> {
		    BookCardDTO bookCardDTO = new BookCardDTO(
		        book.getId().toString(),
		        book.getTitle(),
		        book.getAuthor(),
		        book.getDescription(),
		        book.getNoOfPages(),
		        book.getCoverImage(),
		        0, // Default stock value if Inventory is null
		        0L, // Default selling price if Inventory is null
		        0L // Default MRP if Inventory is null
		    );
		    Inventory inventory = book.getInventory();
		    if (inventory != null) {
		        bookCardDTO.setStock(inventory.getStock());
		        bookCardDTO.setSellingPrice(inventory.getSellingPrice());
		        bookCardDTO.setMrp(inventory.getMrp());
		    }
		    return bookCardDTO;
		}).toList();
	}
}
