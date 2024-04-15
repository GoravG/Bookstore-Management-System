package com.gaurav.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
		return inventoryRepo.findAll().stream().map((inventory)->new InventoryWithTitleDTO(inventory.getId(),inventory.getBook().getTitle(),inventory.getBook().getId(),inventory.getCostPrice(),inventory.getSellingPrice(),inventory.getMrp(),inventory.getStock())).toList();
	}

	public List<BookCardDTO> getAllBooks() {
		List<Inventory> entireInventory = inventoryRepo.findAll();
		return entireInventory.stream().map((inventory)->
		{
			BookCardDTO dto=new BookCardDTO();
			Book book=inventory.getBook();
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
		}
		).toList();
	}
}
