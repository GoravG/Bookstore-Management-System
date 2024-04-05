package com.gaurav.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "newsletters")
public class Newsletter extends BaseEntity {

	@Column(length = 100, unique = true, nullable = false)
	String email;
	@Column
	boolean isActive;

	public Newsletter(String email) {
		super();
		this.email = email;
		this.isActive = true;
	}

}
