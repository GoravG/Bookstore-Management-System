package com.gaurav.services;

import java.util.List;

import org.springdoc.core.converters.models.Pageable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.support.PageableUtils;
import org.springframework.stereotype.Service;

import com.gaurav.custom_exceptions.ResourceNotFoundException;
import com.gaurav.dtos.BookCardDTO;
import com.gaurav.dtos.InventoryWithTitleDTO;
import com.gaurav.entities.Book;
import com.gaurav.entities.Inventory;
import com.gaurav.repositories.InventoryRepository;

@Service
public class InventoryService {

	@Autowired
	public InventoryRepository inventoryRepo;

	public Inventory addOrUpdateInventory(Inventory inventory) {
		return inventoryRepo.save(inventory);
	}

	public Inventory findByBook(Book book) {
		return inventoryRepo.findByBook(book).orElse(new Inventory());
	}

	public List<InventoryWithTitleDTO> getInventory() {
		return inventoryRepo.findAll().stream().map((inventory) -> {
			Book book = inventory.getBook();
			InventoryWithTitleDTO dto = new InventoryWithTitleDTO(inventory.getId(), book.getTitle(), book.getId(),
					inventory.getCostPrice(), inventory.getSellingPrice(), inventory.getMrp(), inventory.getStock());
			return dto;
		}).toList();
	}

	public List<BookCardDTO> getAllBooks(int pageNumber) {
		PageRequest pageRequest = PageRequest.of(pageNumber, 8);
		Page<Inventory> pages = inventoryRepo.findAll(pageRequest);
		List<Inventory> entireInventory = pages.getContent();
		return entireInventory.stream().map((inventory) -> {
			BookCardDTO dto = new BookCardDTO();
			Book book = inventory.getBook();
			dto.setAuthor(book.getAuthor());
			dto.setBookId(book.getId().toString());
			dto.setCoverImage(book.getCoverImage());
			dto.setDescription(book.getDescription());
			dto.setMrp(inventory.getMrp());
			dto.setNoOfPages(book.getNoOfPages());
			dto.setSellingPrice(inventory.getSellingPrice());
			dto.setStock(inventory.getStock());
			dto.setTitle(book.getTitle());
			return dto;
		}).toList();
	}

	public Long getNoOfPages() {
		// TODO Auto-generated method stub
		return inventoryRepo.count();
	}

	public void deleteFromInventory(Long id) {
		inventoryRepo.deleteById(id);
	}

	public Inventory findByInventoryId(Long id) {
		return inventoryRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Inventory with ID:" + id + " not found"));

	}
}
