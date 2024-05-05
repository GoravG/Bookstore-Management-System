package com.gaurav.custom_exceptions;

@SuppressWarnings("serial")
public class WannaGetIntoLossException extends RuntimeException {
	public WannaGetIntoLossException() {
		super("\"Cost Price is More Than Selling Price\"");
	}
}
