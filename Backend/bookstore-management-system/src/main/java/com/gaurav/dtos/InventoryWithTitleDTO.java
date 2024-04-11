package com.gaurav.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InventoryWithTitleDTO {
	public Long id;
	public String title;
	public Long bookId;
	public Long costPrice;
	public Long sellingPrice;
	public Long mrp;
	public Integer stock;
}
