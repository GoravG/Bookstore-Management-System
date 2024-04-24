package com.gaurav.dtos;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InventoryEditDTO {
	@NotBlank(message = "InventoryId necessary")
	private Long inventoryId;
	@NotBlank(message = "Cost price required")
	private Long costPrice;
	@NotBlank(message = "Selling price required")
	private Long sellingPrice;
	@NotBlank(message = "MRP required")
	private Long mrp;
	@Min(value = 0,message = "Stock Should be Minimum Zero")
	private Integer stock;
}
