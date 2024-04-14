package com.gaurav.dtos;

import java.util.ArrayList;
import java.util.List;

import com.gaurav.entities.Address;
import com.gaurav.entities.PaymentMethod;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderDTO {
	@NotBlank
	Address address;
	@NotBlank
	PaymentMethod paymentMethod;
	@NotBlank
	List<OrderItemDTO> orderItems=new ArrayList<>();
}
