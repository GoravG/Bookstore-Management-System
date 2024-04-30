package com.gaurav.repositories;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import com.gaurav.entities.Order;

public interface OrderRepository extends JpaRepository<Order, Long>{
	List<Order> findAllByUserId(Long userId,Sort sort);
	Long countByUserId(Long userId);
}
