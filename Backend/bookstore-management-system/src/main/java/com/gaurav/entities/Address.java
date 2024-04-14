package com.gaurav.entities;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Address{

	@Column(length = 50)
	private String firstLine;
	@Column(length = 50)
	private String city;
	@Column(length = 50)
	private String state;
	@Column(length = 6)
	private String pincode;

}
