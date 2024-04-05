package com.gaurav.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig{
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Autowired
	private JwtAuthenticationFilter jwtFilter;
//	
//	@Autowired
//	private AuthenticationProvider authProvider;
	
	@Bean
	SecurityFilterChain web(HttpSecurity http)throws Exception{
//		http
//		.csrf().disable().cors().disable().authorizeRequests()
//		.requestMatchers("/api/user/register").anonymous()
//		.requestMatchers("/api/user/dashboard").hasRole("USER").anyRequest().authenticated()
//		.and()
//		.httpBasic().and()
//		.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//		.and()
//		.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
//		return http.build();

//		http.csrf(httpSecurityCsrfConfigurer -> httpSecurityCsrfConfigurer.disable())
//		.authorizeHttpRequests((requests) -> requests
//				.requestMatchers("/api/user/register","/swagger-ui/**","/v3/api-docs/**").permitAll()
//				.anyRequest().authenticated())
//		.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//		.headers(httpSecurityHeadersConfigurer -> httpSecurityHeadersConfigurer.frameOptions(frameOptionsConfig -> frameOptionsConfig.disable())) //to make accessible h2 console, it works as frame
//		.exceptionHandling(httpSecurityExceptionHandlingConfigurer -> httpSecurityExceptionHandlingConfigurer.authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))
//		.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
//		return http.build();
		
        http.csrf(AbstractHttpConfigurer::disable)
        .cors(AbstractHttpConfigurer::disable)
        .authorizeHttpRequests((req) -> req.requestMatchers("/api/user/register","/swagger-ui/**","/v3/api-docs/**","/api/user/signin","/api/services/newsletter")
          .permitAll()
          .requestMatchers("/api/user/dashboard")
          .authenticated()
          )
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .addFilterBefore(
        		jwtFilter, 
            UsernamePasswordAuthenticationFilter.class
         );

      return http.build();

	}
}
