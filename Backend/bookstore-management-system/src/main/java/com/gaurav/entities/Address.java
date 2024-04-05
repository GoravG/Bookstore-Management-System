package com.gaurav.entities;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "addresses")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Address extends BaseEntity{
	
	@ManyToOne
	private User user;
	@Column(length = 50)
	private String firstLine;
	@Column(length = 50)
	private String city;
	@Column(length = 50)
	private String state;
	@Column(length = 6)
	private String pincode;

}
