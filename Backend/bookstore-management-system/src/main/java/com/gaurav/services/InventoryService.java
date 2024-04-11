package com.gaurav.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
