package com.gaurav.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	private JwtAuthenticationFilter jwtFilter;

	@Bean
	SecurityFilterChain web(HttpSecurity http) throws Exception {
		http.csrf(httpSecurityCsrfConfigurer -> httpSecurityCsrfConfigurer.disable()) // this is a new method to disable
																						// csrf
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				// again replacement for deprecated methods, we are creating stateless session
				// as this is a REST Application
				.authorizeHttpRequests((authorize) -> authorize // again, old method is deprecated so this is the latest
																// API
						.requestMatchers("/api/user/register","/actuator/health", "/swagger-ui/**", "/v3/api-docs/**", "/api/user/signin",
								"/api/services/newsletter", "/api/admin/signin",
								"/api/commons/**")
						.permitAll() // ant matchers is also deprecated, so this is the replacement
						.requestMatchers("/api/admin/add_book", "/api/admin/add_or_update_inventory",
								"/api/admin/inventory", "/api/admin/book/**")
						.hasAuthority("ADMIN")
						.requestMatchers("/api/user/dashboard", "/api/user/place_order", "/api/user/**")
						.hasAuthority("USER")
//        .requestMatchers( "/common/**").permitAll() // we can also provide allowed methods before the url pattern
						.anyRequest().authenticated()) // rest all the end points are authenticated
				.httpBasic(Customizer.withDefaults()) // httpBasic is a type of security, old method is deprecated

				// this will add our custom filter to intercept any request before it reaches
				// controller
				.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
		return http.build(); // .build() returns the SecurityFilterChain object using the above config stored
								// in HttpSecurity object
	}
}
