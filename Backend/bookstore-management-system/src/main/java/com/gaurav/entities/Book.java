package com.gaurav.entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
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
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "category_id")
	private Category category;
	@Lob
	@Column(columnDefinition = "MEDIUMBLOB")
	private byte[] coverImage;
	
	@OneToOne(mappedBy = "book",fetch = FetchType.LAZY)
	private Inventory inventory;
	
	@OneToMany(mappedBy = "book",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
	private List<OrderItem> orderItem=new ArrayList<>();
	
	public Book(Long id, String title) {
		super(id);
		this.title = title;
	}	
}
