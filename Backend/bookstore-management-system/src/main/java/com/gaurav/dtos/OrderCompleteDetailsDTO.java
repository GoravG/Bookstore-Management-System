package com.gaurav.dtos;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

import com.gaurav.entities.OrderStaus;
import com.gaurav.entities.PaymentMethod;
import com.gaurav.entities.PaymentStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderCompleteDetailsDTO {
	private Long orderId;
	private Long userId;
	private Timestamp createdAt;
	private PaymentMethod paymentMethod;
	private PaymentStatus paymentStatus;
	private OrderStaus orderStatus;
	private BigDecimal totalAmount;
	private List<OrderItemDetailsDTO> items;
}
