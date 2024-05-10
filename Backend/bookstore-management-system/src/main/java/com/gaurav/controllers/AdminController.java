package com.gaurav.controllers;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gaurav.custom_exceptions.WannaGetIntoLossException;
import com.gaurav.dtos.BookDTO;
import com.gaurav.dtos.BookDetailsDTO;
import com.gaurav.dtos.BookEditDTO;
import com.gaurav.dtos.CategoryDTO;
import com.gaurav.dtos.DateAndValuesDTO;
import com.gaurav.dtos.InventoryDTO;
import com.gaurav.dtos.InventoryEditDTO;
import com.gaurav.dtos.InventoryWithTitleDTO;
import com.gaurav.dtos.KeyAndValue;
import com.gaurav.dtos.OrderCompleteDetailsDTO;
import com.gaurav.dtos.OrderDetailDTO;
import com.gaurav.dtos.OrderItemDetailsDTO;
import com.gaurav.dtos.UpdateOrderDTO;
import com.gaurav.dtos.UserSignIn;
import com.gaurav.entities.Book;
import com.gaurav.entities.Category;
import com.gaurav.entities.Inventory;
import com.gaurav.entities.Order;
import com.gaurav.entities.OrderStaus;
import com.gaurav.security.JwtUtils;
import com.gaurav.services.BookService;
import com.gaurav.services.CategoryService;
import com.gaurav.services.InventoryService;
import com.gaurav.services.OrderService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("*")
public class AdminController {

	@Autowired
	ModelMapper mapper;

	@Autowired
	BookService bookService;

	@Autowired
	CategoryService categoryService;

	@Autowired
	InventoryService inventoryService;

	@Autowired
	OrderService orderService;

	@Autowired
	AuthenticationManager mgr;

	@Autowired
	JwtUtils utils;

	@PostMapping("/signin")
	public ResponseEntity<?> adminSignIn(@Valid @RequestBody UserSignIn req) {
		Authentication verifiedAuth = mgr
				.authenticate(new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword()));
		if (verifiedAuth.getAuthorities().iterator().next().getAuthority() != "ADMIN") {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You are not an admin");
		}
		return ResponseEntity.ok(utils.generateJwtToken(verifiedAuth));
	}

	@GetMapping("/inventory")
	public List<InventoryWithTitleDTO> getInventory() {
		return inventoryService.getInventory();
	}

	@PostMapping("/add_book")
	public ResponseEntity<?> addBook(BookDTO req) throws IOException {
		Book book = new Book();
		book.setIsbn(req.getIsbn());
		book.setAuthor(req.getAuthor());
		book.setTitle(req.getTitle());
		book.setDescription(req.getDescription());
		book.setNoOfPages(req.getNoOfPages());
		book.setCoverImage(req.getCoverImage().getBytes());
		Category cat = categoryService.findByCategoryID(Long.parseLong(req.getCategoryId()));
		book.setCategory(cat);
		Book saved = bookService.addNewBook(book);
		if (saved != null)
			return ResponseEntity.status(HttpStatus.CREATED).body("Added " + book.getTitle() + " to database");
		else
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body("Unable to add " + book.getTitle() + " to database");

	}

	@PostMapping("/add_category")
	public ResponseEntity<?> addCategory(@Valid @RequestBody CategoryDTO req) {
		Category cat = mapper.map(req, Category.class);
		Category added = categoryService.addNewCategory(cat);
		if (added != null)
			return ResponseEntity.status(HttpStatus.CREATED).body("Added " + added.getName() + " as new category");
		else
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body("Unable to add " + req.getName() + " as new category");
	}

	@PostMapping("/add_or_update_inventory")
	public ResponseEntity<?> addOrUpdateInventory(@Valid @RequestBody InventoryDTO req) {
		Long cost = req.getCostPrice();
		Long selling = req.getSellingPrice();
		if (cost > selling)
			throw new WannaGetIntoLossException();
		Book book = bookService.findById(req.getBookId());
		Inventory inv = inventoryService.findByBook(book);
		inv.setBook(book);
		inv.setCostPrice(cost);
		inv.setSellingPrice(selling);
		inv.setStock(req.getStock());
		inv.setMrp(req.getMrp());
		inventoryService.addOrUpdateInventory(inv);
		return ResponseEntity.status(HttpStatus.OK).body("Done");
	}

	@GetMapping("/book/{bookId}")
	public ResponseEntity<?> getBookDetails(@PathVariable Long bookId) {
		Book book = bookService.findById(bookId);
		BookDetailsDTO details = mapper.map(book, BookDetailsDTO.class);
		return ResponseEntity.status(HttpStatus.OK).body(details);
	}

	@PatchMapping("/book/edit")
	public ResponseEntity<?> editBookDetails(@Valid @ModelAttribute BookEditDTO dto) throws IOException {
		Book book = bookService.findById(dto.getId());
		if (dto.getAuthor() != null && dto.getAuthor().compareTo(book.getAuthor()) != 0)
			book.setAuthor(dto.getAuthor());
		if (dto.getIsbn() != null && dto.getIsbn().compareTo(book.getIsbn()) != 0)
			book.setIsbn(dto.getIsbn());
		if (dto.getNoOfPages() != null && dto.getNoOfPages().compareTo(book.getNoOfPages()) != 0)
			book.setNoOfPages(dto.getNoOfPages());
		if (dto.getDescription() != null && dto.getDescription().compareTo(book.getDescription()) != 0)
			book.setDescription(dto.getDescription());
		if (dto.getTitle() != null && dto.getTitle().compareTo(book.getTitle()) != 0)
			book.setTitle(dto.getTitle());
		if (dto.getCoverImage() != null) {
			byte[] dtoBytes = dto.getCoverImage().getBytes();
			if (!Arrays.equals(dtoBytes, book.getCoverImage()))
				book.setCoverImage(dto.getCoverImage().getBytes());
		}
		bookService.addNewBook(book);
		return ResponseEntity.status(HttpStatus.OK).body("Successfully edited records of " + book.getTitle());
	}

	@DeleteMapping("/remove_from_inventory/{id}")
	public ResponseEntity<?> deleteBookFromInventory(@PathVariable Long id) {
		inventoryService.deleteFromInventory(id);
		return ResponseEntity.status(HttpStatus.ACCEPTED).body("Deleted Inventory With ID: " + id + " successfully");
	}

	@GetMapping("/inventory/{id}")
	public ResponseEntity<?> getInventoryDetails(@PathVariable Long id) {
		Inventory inventory = inventoryService.findByInventoryId(id);
		Book book = inventory.getBook();
		InventoryWithTitleDTO dto = new InventoryWithTitleDTO(inventory.getId(), book.getTitle(), book.getId(),
				inventory.getCostPrice(), inventory.getSellingPrice(), inventory.getMrp(), inventory.getStock());
		return ResponseEntity.status(HttpStatus.OK).body(dto);
	}

	@PatchMapping("/inventory/edit")
	public ResponseEntity<?> editInventoryDetails(@Valid @RequestBody InventoryEditDTO req) {
		Inventory inventory = inventoryService.findByInventoryId(req.getInventoryId());
		inventory.setCostPrice(req.getCostPrice());
		inventory.setSellingPrice(req.getSellingPrice());
		inventory.setMrp(req.getMrp());
		inventory.setStock(req.getStock());
		inventoryService.addOrUpdateInventory(inventory);
		return ResponseEntity.status(HttpStatus.ACCEPTED)
				.body("Inventory with ID: " + req.getInventoryId() + " edited successfully");
	}

	@GetMapping("/orders/{pageNo}")
	public ResponseEntity<?> getAllOrders(@PathVariable Long pageNo) {
		List<OrderDetailDTO> orders = orderService.findAllOrdersByPageNumber(pageNo);
		return ResponseEntity.status(HttpStatus.OK).body(orders);
	}
	@GetMapping("/orders/no_of_pages")
	public ResponseEntity<?> getNumberOfPagesOfOrders(){
		Long totalOrders=orderService.getCountOfAllOrders();
		Double numberOfPages=(double)Math.ceil(totalOrders.doubleValue()/12.0);
		return ResponseEntity.status(HttpStatus.OK).body(numberOfPages);
	}

	@GetMapping("/order/{orderId}")
	public ResponseEntity<?> getOrderDetailsByOrderId(@PathVariable Long orderId) {
		Order order = orderService.getOrderById(orderId);
		OrderCompleteDetailsDTO dto = new OrderCompleteDetailsDTO(order.getId(), order.getUser().getId(),
				order.getCreatedAt(), order.getPaymentMethod(), order.getPaymentStatus(), order.getOrderStatus(),
				order.getTotalAmount(),
				order.getOrderItems().stream().map((item) -> 
				new OrderItemDetailsDTO(item.getId(),item.getBook().getId(),
						item.getBook().getTitle(), item.getQuantity(), item.getSellingPrice(), item.getCostPrice()))
						.toList());
		return ResponseEntity.status(HttpStatus.OK).body(dto);

	}
	@PatchMapping("/order/update")
	public ResponseEntity<?> updateOrderDetails(@Valid @RequestBody UpdateOrderDTO req){
		Order order = orderService.getOrderById(req.getOrderId());
		if(req.getPaymentStatus().toString()=="FAILED" || req.getOrderStatus().toString()=="CANCELLED")
		{
			System.out.println("In Cancel Order");
			orderService.cancelOrder(order);
			return ResponseEntity.status(HttpStatus.OK).body("Cancelled Order With ID:"+req.getOrderId());
		}
		else
		{
			order.setPaymentStatus(req.getPaymentStatus());
			order.setOrderStatus(req.getOrderStatus());
			orderService.updateOrder(order);
			return ResponseEntity.status(HttpStatus.OK).body("Successfully Updated Order With ID:"+req.getOrderId());
		}
	}
	@DeleteMapping("/order/cancel/{orderId}")
	public ResponseEntity<?> cancelOrderByOrderId(@PathVariable Long orderId){
		Order order = orderService.getOrderById(orderId);
		orderService.cancelOrder(order);
		return ResponseEntity.status(HttpStatus.ACCEPTED).body("Cancelled Order With ID" + orderId + " successfully");
	}
	@GetMapping("/orders/last_n_day_orders")
	public ResponseEntity<?>getLastNDaysOrderNumber(@RequestParam("last_days") String last_days){
		Long stats=orderService.getLastXDayOrders(Long.valueOf(last_days));
		return ResponseEntity.status(HttpStatus.OK).body(stats);
	}
	@GetMapping("/orders/count_orders")
	public ResponseEntity<?>getCountOfOrdersByOrderStatus(@RequestParam("status") String status){
		OrderStaus os = OrderStaus.valueOf(status);
		Long stats=orderService.getCountOfOrdersByOrderStatus(os);
		return ResponseEntity.status(HttpStatus.OK).body(stats);
	}
	@GetMapping("/orders/get_last_n_day_profit")
	public ResponseEntity<?>getLastNDaysProfit(@RequestParam("last_days") String last_days){
		Double stats=orderService.getProfitByDays(Long.valueOf(last_days));
		return ResponseEntity.status(HttpStatus.OK).body(stats);
	}
	@GetMapping("/orders/get_last_n_day_orders")
	public ResponseEntity<?> getLast7DayOrders(@RequestParam("last_days") String last_days){
		List<DateAndValuesDTO> orders=orderService.getLast7DayOrders(Integer.valueOf(last_days));
		return ResponseEntity.status(HttpStatus.OK).body(orders);
	}
	@GetMapping("/orders/get_order_count_by_order_status")
	public ResponseEntity<?> getOrderCountByOrderStatus(){
		List<KeyAndValue> list=orderService.getOrderCountByOrderStatusAll();
		return ResponseEntity.status(HttpStatus.OK).body(list);
	}
}
