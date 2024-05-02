package com.gaurav.repositories;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import com.gaurav.entities.Order;

public interface OrderRepository extends JpaRepository<Order, Long>{
	Long countByUserId(Long userId);
	boolean existsByIdAndUserId(Long orderId,Long userId);
}
