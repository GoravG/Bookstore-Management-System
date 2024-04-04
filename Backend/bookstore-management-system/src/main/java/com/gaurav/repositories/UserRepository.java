package com.gaurav.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gaurav.entities.User;

public interface UserRepository extends JpaRepository<User, Long>{
	boolean existsByEmail(String email);
}
