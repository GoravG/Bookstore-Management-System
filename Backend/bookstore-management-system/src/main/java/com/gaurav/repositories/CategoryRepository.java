package com.gaurav.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.gaurav.dtos.BookCardDTO;
import com.gaurav.entities.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}
