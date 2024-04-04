package com.gaurav.custom_exceptions;

@SuppressWarnings("serial")
public class EmailExistsException extends RuntimeException {
	public EmailExistsException(String email) {
		super("There is already an accound with provided email address:"+email);
	}

}
