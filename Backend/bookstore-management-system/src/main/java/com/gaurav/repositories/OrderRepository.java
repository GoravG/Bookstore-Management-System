package com.gaurav.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gaurav.entities.Order;

public interface OrderRepository extends JpaRepository<Order, Long>{
	
}
