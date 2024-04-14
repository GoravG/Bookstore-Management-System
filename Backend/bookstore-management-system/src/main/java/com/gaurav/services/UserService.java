package com.gaurav.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.gaurav.custom_exceptions.EmailExistsException;
import com.gaurav.custom_exceptions.ResourceNotFoundException;
import com.gaurav.dtos.UserRegistrationDTO;
import com.gaurav.entities.Role;
import com.gaurav.entities.User;
import com.gaurav.repositories.UserRepository;

@Service
public class UserService {
	@Autowired
	UserRepository userRepo;

	@Autowired
	PasswordEncoder passwordEncoder;

	public User registerNewUserAccount(UserRegistrationDTO userRegDTO) {
		User user = new User(userRegDTO.getFirstName(),userRegDTO.getLastName(),userRegDTO.getPhoneNo(),userRegDTO.getEmail(), passwordEncoder.encode(userRegDTO.getPassword()),userRegDTO.getDate());
		if (emailExists(userRegDTO.getEmail()))
			throw new EmailExistsException(userRegDTO.getEmail());
		User registeredUser = userRepo.save(user);
		return registeredUser;

	}
	public User registerNewAdminAccount(UserRegistrationDTO userRegDTO) {
		User user = new User(userRegDTO.getFirstName(),userRegDTO.getLastName(),userRegDTO.getPhoneNo(),userRegDTO.getEmail(), passwordEncoder.encode(userRegDTO.getPassword()),userRegDTO.getDate());
		user.setRole(Role.ADMIN);
		if (emailExists(userRegDTO.getEmail()))
			throw new EmailExistsException(userRegDTO.getEmail());
		User registeredUser = userRepo.save(user);
		return registeredUser;
	}

	private boolean emailExists(String email) {
		return userRepo.existsByEmail(email);
	}
	public User findUserByEmail(String email) {
		return userRepo.findByEmail(email).orElseThrow(()->new ResourceNotFoundException("User associated with Email:"+email+" does not exist"));
	}
}
