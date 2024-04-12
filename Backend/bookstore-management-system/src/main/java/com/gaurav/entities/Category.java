package com.gaurav.entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "categories")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Category extends BaseEntity {
	@Column(length = 20, unique = true, nullable = false)
	private String name;
	@Column(length = 200)
	private String description;
	@OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
	private List<Book> bookList = new ArrayList<>();

	public Category(String name, String description) {
		super();
		this.name = name;
		this.description = description;
	}
}
