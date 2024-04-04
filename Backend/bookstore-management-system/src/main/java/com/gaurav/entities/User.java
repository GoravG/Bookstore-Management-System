package com.gaurav.entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "password")
public class User extends BaseEntity {

	@Column(length = 50, unique = true, nullable = false)
	private String email;
	@Column(length = 255)
	private String password;
	@Enumerated(EnumType.STRING)
	private Role role;
	@OneToMany(mappedBy = "user")
	private List<Address> addressList = new ArrayList<>();
	public User(String email, String password) {
		super();
		this.email = email;
		this.password = password;
		this.role=Role.USER;
	}

}
