package com.gaurav.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "books")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Book extends BaseEntity {
	@Column(unique = true,nullable = false)
	private String isbn;
	@Column(length=40)
	private String title;
	@Column(length=40)
	private String author;
	@Column(length=200)
	private String description;
	@Column
	private Integer noOfPages;
	@ManyToOne
	@JoinColumn(name = "category_id")
	private Category category;
	@Lob
	@Column(columnDefinition = "MEDIUMBLOB")
	private byte[] coverImage;
}
