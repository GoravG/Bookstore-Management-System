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
public class InventoryDTO {
	@NotBlank
	private Long bookId;
	@NotBlank
	private Long costPrice;
	@NotBlank
	private Long sellingPrice;
	@NotBlank
	private Long mrp;
	@NotBlank
	private Integer stock;

}
