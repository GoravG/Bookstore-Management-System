package com.gaurav.entities;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "order_items")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderItem extends BaseEntity{
	//ERROR:"object references an unsaved transient instance - save the transient instance before flushing" error
	//Otherwise https://stackoverflow.com/questions/2302802/how-to-fix-the-hibernate-object-references-an-unsaved-transient-instance-save
	@ManyToOne(cascade = CascadeType.PERSIST)
	@JoinColumn(name = "order_id")
	private Order order;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "book_id")
	private Book book;
	
	private Integer quantity;
	
	private Long sellingPrice;
	
	private Long costPrice;
}
