package com.gaurav.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gaurav.entities.Newsletter;

public interface NewsletterRepository extends JpaRepository<Newsletter, Long>{
	
}
