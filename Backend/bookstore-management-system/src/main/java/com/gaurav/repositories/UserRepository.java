package com.gaurav.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.gaurav.entities.User;


public interface UserRepository extends JpaRepository<User, Long>{
	boolean existsByEmail(String email);
	@Query("SELECT u FROM User u WHERE u.email = ?1")
	User findByEmail(String email);
}
