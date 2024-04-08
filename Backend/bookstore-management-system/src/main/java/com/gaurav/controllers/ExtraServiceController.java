package com.gaurav.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gaurav.dtos.NewsletterRegistrationDTO;
import com.gaurav.services.NewsletterService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/services")
@CrossOrigin("*")
public class ExtraServiceController {

	@Autowired
	NewsletterService newsLetterService;

	@PostMapping("/newsletter")
	public ResponseEntity<?> subscribeToNewsletter(@Valid @RequestBody NewsletterRegistrationDTO req) {
		newsLetterService.subscribeForNewsletter(req.getEmail());
		return ResponseEntity.status(HttpStatus.OK).body("Subscribed for newsletter");
	}

}
