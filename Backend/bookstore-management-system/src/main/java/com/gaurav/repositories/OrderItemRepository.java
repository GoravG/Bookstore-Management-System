package com.gaurav.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gaurav.entities.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

}
