package com.gaurav.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gaurav.entities.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}
