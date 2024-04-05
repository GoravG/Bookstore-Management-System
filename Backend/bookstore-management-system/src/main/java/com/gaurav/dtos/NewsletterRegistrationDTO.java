package com.gaurav.dtos;

import jakarta.validation.constraints.Email;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NewsletterRegistrationDTO {
	@Email
	private String email;
}
