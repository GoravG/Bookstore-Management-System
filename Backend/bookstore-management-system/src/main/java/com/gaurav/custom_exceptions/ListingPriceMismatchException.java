package com.gaurav.custom_exceptions;

public class ListingPriceMismatchException extends RuntimeException {

	public ListingPriceMismatchException(Long actualAmount, Long receivedAmount) {
		super("Actual Amount was:"+actualAmount+" but received amount was:"+receivedAmount);
	}
	
}
