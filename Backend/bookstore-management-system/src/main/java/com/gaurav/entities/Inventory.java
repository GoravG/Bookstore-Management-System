package com.gaurav.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Inventory extends BaseEntity{
	@OneToOne
	@JoinColumn(name = "book_id")
	private Book book;
	@Column(nullable = false)
	private Long costPrice;
	@Column(nullable = false)
	private Long sellingPrice;
	@Column(nullable = false)
	private Long mrp;
	@Column(nullable = false)
	private Integer stock;
}
