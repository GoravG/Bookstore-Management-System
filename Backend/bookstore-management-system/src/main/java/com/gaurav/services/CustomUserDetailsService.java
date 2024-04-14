package com.gaurav.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.gaurav.custom_exceptions.ResourceNotFoundException;
import com.gaurav.entities.User;
import com.gaurav.repositories.UserRepository;
import com.gaurav.security.CustomUserDetails;

@Service
public class CustomUserDetailsService implements UserDetailsService{
	
	@Autowired
	UserRepository userRepository;

	@Override
	public CustomUserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		System.out.println("Here:"+Thread.currentThread().getName());
		User user = userRepository.findByEmail(username).orElseThrow(()->new ResourceNotFoundException("User Not Found"));
		if (user == null) {
			System.out.println("There");
            throw new UsernameNotFoundException(username);
        }
		System.out.println(user.getEmail()+" "+user.getPassword());
        return new CustomUserDetails(user);
	}
	

}
