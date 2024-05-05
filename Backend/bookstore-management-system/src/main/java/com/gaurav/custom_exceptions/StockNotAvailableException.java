package com.gaurav.custom_exceptions;

@SuppressWarnings("serial")
public class StockNotAvailableException extends RuntimeException {

	public StockNotAvailableException(Long bookID, Integer stock, Integer quantity) {
		super("BookID:"+bookID+" has only "+stock+" books left and you have requested "+quantity+" units.");
	}

}
