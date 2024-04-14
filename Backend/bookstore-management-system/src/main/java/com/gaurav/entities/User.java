package com.gaurav.entities;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User extends BaseEntity {

	@Column(length = 50)
	private String firstName;
	@Column(length = 50)
	private String lastName;
	@Column(length = 10)
	private String phoneNo;
	@Column(length = 50, unique = true, nullable = false)
	private String email;
	@Column(length = 255)
	private String password;
	@Enumerated(EnumType.STRING)
	private Role role;
	@Column(length = 12)
	private LocalDate dob;
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Order> orders = new ArrayList<>();

	public User(String firstName, String lastName, String phoneNo, String email, String password,LocalDate dob) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.phoneNo = phoneNo;
		this.email = email;
		this.password = password;
		this.role = Role.USER;
		this.dob=dob;
	}

	@Override
	public String toString() {
		return "User [email=" + email + ", password=" + password + ", role=" + role + "]";
	}

}
