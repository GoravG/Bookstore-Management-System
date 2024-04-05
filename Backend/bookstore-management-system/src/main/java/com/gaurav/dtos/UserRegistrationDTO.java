package com.gaurav.dtos;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserRegistrationDTO {
	@NotBlank(message = "First name required")
	private String firstName;
	@NotBlank(message = "Last name required")
	private String lastName;
	@NotBlank(message = "Phone no required")
	private String phoneNo;
	@NotBlank(message = "Email required")
	private String email;
	@NotBlank(message = "Date required")
	private LocalDate date;
	@NotBlank(message = "password required")
	private String password;
}
