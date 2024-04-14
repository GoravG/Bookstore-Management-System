package com.gaurav.services;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gaurav.custom_exceptions.ListingPriceMismatchException;
import com.gaurav.custom_exceptions.ResourceNotFoundException;
import com.gaurav.custom_exceptions.StockNotAvailableException;
import com.gaurav.dtos.OrderDTO;
import com.gaurav.dtos.OrderItemDTO;
import com.gaurav.entities.Address;
import com.gaurav.entities.Book;
import com.gaurav.entities.Inventory;
import com.gaurav.entities.Order;
import com.gaurav.entities.OrderItem;
import com.gaurav.entities.OrderStaus;
import com.gaurav.entities.PaymentStatus;
import com.gaurav.entities.User;
import com.gaurav.repositories.InventoryRepository;
import com.gaurav.repositories.OrderItemRepository;
import com.gaurav.repositories.OrderRepository;

import jakarta.transaction.Transactional;

@Service
public class OrderService {
	
	@Autowired
	private OrderRepository orderRepository;
	
	@Autowired
	private InventoryRepository inventoryRepository;
	
	@Autowired
	private OrderItemRepository orderItemRepository;
	
	@Transactional
	public Order placeOrder(OrderDTO orderDTO,User user) {
		BigDecimal totalAmt=BigDecimal.ZERO;
		List<OrderItem> orderItems=new ArrayList<>();
		
		List<OrderItemDTO> orderItemsDTO = orderDTO.getOrderItems();
		
		Address address=orderDTO.getAddress();
		Order order=new Order();
		order.setUser(user);
		order.setAddress(address);
		order.setPaymentMethod(orderDTO.getPaymentMethod());
		order.setOrderStatus(OrderStaus.PENDING);
		order.setPaymentStatus(PaymentStatus.PENDING);
		for(int i=0;i<orderItemsDTO.size();i++) {
			int index=i;
			//DTO specific
			Long bookID=orderItemsDTO.get(index).getBookId();
			Integer quantity=orderItemsDTO.get(index).getQuantity();
			Long amount = orderItemsDTO.get(index).getAmount();
			
			Inventory inventory=inventoryRepository.findByBookId(bookID).orElseThrow(
					()->new ResourceNotFoundException("Inventory does not have book with ID:"+bookID));
			Integer stock=inventory.getStock();
			Long sellingPrice=inventory.getSellingPrice();
			Long costPrice=inventory.getCostPrice();
			Book book=inventory.getBook();
			if(stock<quantity)
				throw new StockNotAvailableException(bookID,stock,quantity);
			Long actualAmount=sellingPrice*quantity;
			if(actualAmount.compareTo(amount)!=0)
				throw new ListingPriceMismatchException(actualAmount,amount);
			OrderItem item=new OrderItem(order, book, quantity, sellingPrice, costPrice);
			orderItems.add(item);
			orderItemRepository.save(item);
			totalAmt=totalAmt.add(new BigDecimal(actualAmount));
			System.out.println("Total Amount:"+totalAmt);
			inventory.setStock(stock-quantity);
			inventoryRepository.save(inventory);
		}
		order.setOrderItems(orderItems);
		order.setTotalAmount(totalAmt);
		Order ordered=orderRepository.save(order);
		return ordered;
	}

}
