package com.gaurav.repositories;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.gaurav.entities.Order;
import com.gaurav.entities.OrderStaus;

public interface OrderRepository extends JpaRepository<Order, Long>{
	Long countByUserId(Long userId);
	boolean existsByIdAndUserId(Long orderId,Long userId);
	Long countByCreatedAtBetween(Timestamp start,Timestamp end);
	Long countByOrOrderStatus(OrderStaus orderStatus);
	@Query(value = "select ifnull(sum((selling_price-cost_price)*quantity),0) from order_items where order_id in(select id from order_master where order_status='DELIVERED' and created_at between NOW() - INTERVAL ?1 DAY and NOW());",nativeQuery = true)
	Double getTotalProfit(Long days);
	Long countByOrderStatus(OrderStaus orderStatus);
	List<Order>findAllByUserId(Long userId,Pageable page);
}
