package com.gaurav.services;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Month;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalField;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.gaurav.custom_exceptions.ListingPriceMismatchException;
import com.gaurav.custom_exceptions.ResourceNotFoundException;
import com.gaurav.custom_exceptions.StockNotAvailableException;
import com.gaurav.dtos.DateAndValuesDTO;
import com.gaurav.dtos.KeyAndValue;
import com.gaurav.dtos.OrderCompleteDetailsDTO;
import com.gaurav.dtos.OrderDTO;
import com.gaurav.dtos.OrderDetailDTO;
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
	public Order placeOrder(OrderDTO orderDTO, User user) {
		BigDecimal totalAmt = BigDecimal.ZERO;
		List<OrderItem> orderItems = new ArrayList<>();

		List<OrderItemDTO> orderItemsDTO = orderDTO.getOrderItems();

		Address address = orderDTO.getAddress();
		Order order = new Order();
		order.setUser(user);
		order.setAddress(address);
		order.setPaymentMethod(orderDTO.getPaymentMethod());
		order.setOrderStatus(OrderStaus.PENDING);
		order.setPaymentStatus(PaymentStatus.PENDING);
		for (int i = 0; i < orderItemsDTO.size(); i++) {
			int index = i;
			// DTO specific
			Long bookID = orderItemsDTO.get(index).getBookId();
			Integer quantity = orderItemsDTO.get(index).getQuantity();
			Long amount = orderItemsDTO.get(index).getAmount();

			Inventory inventory = inventoryRepository.findByBookId(bookID)
					.orElseThrow(() -> new ResourceNotFoundException("Inventory does not have book with ID:" + bookID));
			Integer stock = inventory.getStock();
			Long sellingPrice = inventory.getSellingPrice();
			Long costPrice = inventory.getCostPrice();
			Book book = inventory.getBook();
			if (stock < quantity)
				throw new StockNotAvailableException(bookID, stock, quantity);
			Long actualAmount = sellingPrice * quantity;
			if (actualAmount.compareTo(amount) != 0)
				throw new ListingPriceMismatchException(actualAmount, amount);
			OrderItem item = new OrderItem(order, book, quantity, sellingPrice, costPrice);
			orderItems.add(item);
			orderItemRepository.save(item);
			totalAmt = totalAmt.add(new BigDecimal(actualAmount));
			System.out.println("Total Amount:" + totalAmt);
			inventory.setStock(stock - quantity);
			inventoryRepository.save(inventory);
		}
		order.setOrderItems(orderItems);
		order.setTotalAmount(totalAmt);
		Order ordered = orderRepository.save(order);
		return ordered;
	}

	public List<OrderDetailDTO> findAllOrders() {
		return orderRepository.findAll().stream()
				.map((order) -> new OrderDetailDTO(order.getId(), order.getUser().getId(), order.getAddress(),
						order.getCreatedAt(), order.getUpdatedAt(), order.getPaymentMethod(), order.getPaymentStatus(),
						order.getOrderStatus(), order.getTotalAmount()))
				.toList();
	}

	public Order getOrderById(Long orderId) {
		return orderRepository.findById(orderId)
				.orElseThrow(() -> new ResourceNotFoundException("Order associated with ID " + orderId + " not found"));

	}

	public void updateOrder(Order order) {
		orderRepository.save(order);
	}
	@Transactional
	public void cancelOrder(Order order) {
		List<OrderItem> orderItems = order.getOrderItems();
		for(OrderItem item:orderItems) {
			Long bookId = item.getBook().getId();
			Integer quantity=item.getQuantity();
			Inventory inventory = inventoryRepository.findByBookId(bookId).orElseThrow(()->new ResourceNotFoundException("Book associated with ID:"+bookId+" not found"));
			inventory.setStock(inventory.getStock()+quantity);
			inventoryRepository.save(inventory);
		}
		order.setPaymentStatus(PaymentStatus.FAILED);
		order.setOrderStatus(OrderStaus.CANCELLED);
		orderRepository.save(order);
	}

	public List<OrderDetailDTO> findOrdersByUserId(Long id,Integer pageNumber) {
		Pageable pageRequest = PageRequest.of(pageNumber, 4,Sort.by(Sort.Direction.DESC,"id"));
		return orderRepository.findAllByUserId(id,pageRequest).stream()
				.map((order) -> new OrderDetailDTO(order.getId(), order.getUser().getId(), order.getAddress(),
						order.getCreatedAt(), order.getUpdatedAt(), order.getPaymentMethod(), order.getPaymentStatus(),
						order.getOrderStatus(), order.getTotalAmount()))
				.toList();
	}

	public Long getCountOfOrdersByUserId(Long id) {
		return orderRepository.countByUserId(id);
	}
	public boolean doesOrderBelongToUser(Long orderId,Long userId) {
		return orderRepository.existsByIdAndUserId(orderId,userId);
	}

	public Long getLastXDayOrders(Long lastDays) {
		LocalDateTime startTime = LocalDateTime.now();
		System.out.println("Start:"+startTime);
        LocalDateTime endTime = LocalDate.now().atStartOfDay().minusDays(lastDays);
        System.out.println("End:"+endTime);
        Timestamp s = Timestamp.valueOf(startTime);
        Timestamp e = Timestamp.valueOf(endTime);
		return orderRepository.countByCreatedAtBetween(e,s);
	}
	public Long getCountOfOrdersByOrderStatus(OrderStaus orderStatus) {
		return orderRepository.countByOrOrderStatus(orderStatus);
	}
	public Double getProfitByDays(Long lastDays) {
		return orderRepository.getTotalProfit(lastDays);
	}

	public List<DateAndValuesDTO> getLast7DayOrders(int lastDays) {
		List<DateAndValuesDTO>list=new ArrayList<>();
		for(int i=0;i<lastDays;i++) {
			int year = LocalDateTime.now().getYear();
			int month = LocalDateTime.now().getMonth().getValue();
			int date = LocalDateTime.now().getDayOfMonth();
			Timestamp start=Timestamp.valueOf(LocalDateTime.of(year, month, date, 0, 0).minusDays(i));
			Timestamp end=Timestamp.valueOf(LocalDateTime.of(year, month, date, 23, 59).minusDays(i));
			Long count = orderRepository.countByCreatedAtBetween(start, end);
			list.add(new DateAndValuesDTO(LocalDate.of(year, month, date).minusDays(i),count.intValue()));
		}
		return list;
	}

	public List<KeyAndValue> getOrderCountByOrderStatusAll() {
		List<KeyAndValue> stats=new ArrayList<>();
		Long cancelledCount = orderRepository.countByOrderStatus(OrderStaus.CANCELLED);
		stats.add(new KeyAndValue(OrderStaus.CANCELLED.toString(), cancelledCount.toString()));
		Long deliveredCount= orderRepository.countByOrderStatus(OrderStaus.DELIVERED);
		stats.add(new KeyAndValue(OrderStaus.DELIVERED.toString(), deliveredCount.toString()));
		Long pendingCount= orderRepository.countByOrderStatus(OrderStaus.PENDING);
		stats.add(new KeyAndValue(OrderStaus.PENDING.toString(), pendingCount.toString()));
		Long processingCount= orderRepository.countByOrderStatus(OrderStaus.PROCESSING);
		stats.add(new KeyAndValue(OrderStaus.PROCESSING.toString(), processingCount.toString()));
		Long shippedCount= orderRepository.countByOrderStatus(OrderStaus.SHIPPED);
		stats.add(new KeyAndValue(OrderStaus.SHIPPED.toString(), shippedCount.toString()));
		return stats;
	}
}
