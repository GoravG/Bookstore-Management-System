package com.gaurav.dtos;

import com.gaurav.entities.OrderStaus;
import com.gaurav.entities.PaymentStatus;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UpdateOrderDTO {
	@NotBlank(message = "OrderID required")
	private Long orderId;
	@NotBlank(message = "Payment Status required")
	private PaymentStatus paymentStatus;
	@NotBlank(message = "Order Status required")
	private OrderStaus orderStatus;
}
