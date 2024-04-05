package com.gaurav.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserSignIn {
	@NotBlank(message = "Email necessary")
	private String email;
	@NotBlank(message = "Password necessary")
	private String password;
}
