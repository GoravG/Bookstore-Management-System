package com.gaurav.dtos;

import java.math.BigDecimal;
import java.sql.Timestamp;
import com.gaurav.entities.Address;

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
public class OrderDetailDTO {
	private Long orderId;
	private Long userId;
	private Address address;
	private Timestamp createdAt;
	private Timestamp updatedAt;
	private PaymentMethod paymentMethod;
	private PaymentStatus paymentStatus;
	private OrderStaus orderStatus;
	private BigDecimal totalAmount;
}
