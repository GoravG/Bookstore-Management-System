package com.gaurav.custom_exceptions;

@SuppressWarnings("serial")
public class EmailExistsException extends RuntimeException {
	public EmailExistsException(String email) {
		super("There is already an account with provided email address:"+email);
	}

}
