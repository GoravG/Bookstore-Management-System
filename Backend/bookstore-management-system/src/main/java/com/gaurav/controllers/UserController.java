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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gaurav.dtos.OrderDTO;
import com.gaurav.dtos.OrderItemDTO;
import com.gaurav.dtos.UserRegistrationDTO;
import com.gaurav.dtos.UserSignIn;
import com.gaurav.entities.Order;
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
}
