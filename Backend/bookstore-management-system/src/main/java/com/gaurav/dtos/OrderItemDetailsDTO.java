package com.gaurav.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderItemDetailsDTO {
	private Long id;
	private Long bookId;
	private String title;
	private Integer quantity;
	private Long sellingPrice;
	private Long costPrice;
}
