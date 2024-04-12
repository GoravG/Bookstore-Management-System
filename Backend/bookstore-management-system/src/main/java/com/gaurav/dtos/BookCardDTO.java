package com.gaurav.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookCardDTO {
	private String bookId;
	private String title;
	private String author;
	private String description;
	private Integer noOfPages;
	private byte[] coverImage;
	private Integer stock;
	private Long sellingPrice;
	private Long mrp;
}
