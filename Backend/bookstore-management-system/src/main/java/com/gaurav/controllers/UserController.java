package com.gaurav.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gaurav.dtos.OrderCompleteDetailsDTO;
import com.gaurav.dtos.OrderDTO;
import com.gaurav.dtos.OrderDetailDTO;
import com.gaurav.dtos.OrderItemDTO;
import com.gaurav.dtos.OrderItemDetailsDTO;
import com.gaurav.dtos.UserRegistrationDTO;
import com.gaurav.dtos.UserSignIn;
import com.gaurav.entities.Order;
import com.gaurav.entities.OrderStaus;
import com.gaurav.entities.PaymentStatus;
import com.gaurav.entities.User;
import com.gaurav.security.JwtUtils;
import com.gaurav.services.OrderService;
import com.gaurav.services.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/user")
@CrossOrigin("*")
public class UserController {

	@Autowired
	UserService userService;
	
	@Autowired
	OrderService orderService;

	@Autowired
	AuthenticationManager mgr;

	@Autowired
	JwtUtils utils;

	@PostMapping("/register")
	public ResponseEntity<?> registerNewUser(@RequestBody @Valid UserRegistrationDTO request) {
		userService.registerNewUserAccount(request);
		return ResponseEntity.status(HttpStatus.CREATED).body("User registration successful");
	}

	@PostMapping("/signin")
	public ResponseEntity<?> userSignIn(@RequestBody @Valid UserSignIn request) {
		Authentication verifiedAuth = mgr
				.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
		if (verifiedAuth.getAuthorities().iterator().next().getAuthority() != "USER") {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You are not A User");
		}
		return ResponseEntity.ok(utils.generateJwtToken(verifiedAuth));
	}

	@GetMapping("/dashboard")
	public ResponseEntity<?> userDashboard() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (auth != null)
			return ResponseEntity.ok("Happy");
		return ResponseEntity.ok("NOt Happy");
	}

	@PostMapping("/place_order")
	public ResponseEntity<?> placeOrder(@RequestBody @Valid OrderDTO order){
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		User user=userService.findUserByEmail(auth.getName());
		Order placedOrder=orderService.placeOrder(order, user);
		if(placedOrder!=null)
			return ResponseEntity.status(HttpStatus.CREATED).body("Order with Order ID:"+placedOrder.getId()+" placed successfully");
		else
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Unable to Place Order");
	}
	@GetMapping("/orders/{pageNumber}")
	public ResponseEntity<?> getAllOrdersOfUser(@PathVariable Integer pageNumber){
		System.out.println("In Orders PageNumber:"+pageNumber);
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		System.out.println("Email:"+auth.getName());
		User user=userService.findUserByEmail(auth.getName());
		System.out.println("UserID:"+user.getId());
		List<OrderDetailDTO> orders=orderService.findOrdersByUserId(user.getId(),pageNumber-1);
		return ResponseEntity.status(HttpStatus.OK).body(orders);
	}
	@GetMapping("/order_count")
	public ResponseEntity<?> getNoOfOrdersOfUser(){
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		User user=userService.findUserByEmail(auth.getName());
		Long orderCount=orderService.getCountOfOrdersByUserId(user.getId());
		return ResponseEntity.status(HttpStatus.OK).body(orderCount);
	}
	@GetMapping("/order/{orderId}")
	public ResponseEntity<?> getOrderDetails(@PathVariable Long orderId){
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		User user=userService.findUserByEmail(auth.getName());
		Long userId=user.getId();
		boolean orderExists=orderService.doesOrderBelongToUser(orderId,userId);
		if(!orderExists)
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Order with order id "+orderId+" is not your order");
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
	@DeleteMapping("/order/{orderId}")
	public ResponseEntity<?> cancelUserOrder(@PathVariable Long orderId){
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		User user=userService.findUserByEmail(auth.getName());
		Long userId=user.getId();
		boolean orderExists=orderService.doesOrderBelongToUser(orderId,userId);
		if(!orderExists)
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Cannot cancel order with order id "+orderId+" is not your order");
		Order order = orderService.getOrderById(orderId);
		orderService.cancelOrder(order);
		return ResponseEntity.status(HttpStatus.OK).body("Order Cancelled Successfully");
	}
}
