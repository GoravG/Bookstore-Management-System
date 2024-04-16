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
public class SecurityConfig{
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Autowired
	private JwtAuthenticationFilter jwtFilter;
	
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
		
//        http.csrf(AbstractHttpConfigurer::disable)
//        .cors(AbstractHttpConfigurer::disable)
//        .authorizeHttpRequests((req) -> req.requestMatchers("/api/user/register","/swagger-ui/**","/v3/api-docs/**","/api/user/signin","/api/services/newsletter","/api/admin/signin","/api/admin/add_book")
//          .permitAll()
//          .requestMatchers("/api/admin/hello").hasRole("ADMIN")
//          .requestMatchers("/api/user/dashboard").hasRole("USER")
//          .anyRequest()
//          .authenticated()
//          )
//        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//        .addFilterBefore(
//        		jwtFilter, 
//            UsernamePasswordAuthenticationFilter.class
//         );
//
//      return http.build();
		http
        .csrf(httpSecurityCsrfConfigurer -> httpSecurityCsrfConfigurer.disable()) // this is a new method to disable csrf
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        // again replacement for deprecated methods, we are creating stateless session as this is a REST Application 
        .authorizeHttpRequests((authorize)->authorize //again, old method is deprecated so this is the latest API
        		.requestMatchers("/api/user/register","/swagger-ui/**","/v3/api-docs/**","/api/user/signin","/api/services/newsletter","/api/admin/signin"
        				,"/api/commons/categories","/api/commons/**").permitAll() // ant matchers is also deprecated, so this is the replacement
        .requestMatchers("/api/admin/add_book","/api/admin/add_or_update_inventory","/api/admin/inventory","/api/admin/book/**").hasAuthority("ADMIN")
        .requestMatchers("/api/user/dashboard","/api/user/place_order").hasAuthority("USER")
//        .requestMatchers( "/common/**").permitAll() // we can also provide allowed methods before the url pattern
        .anyRequest().authenticated()) // rest all the end points are authenticated
        .httpBasic(Customizer.withDefaults()) // httpBasic is a type of security, old method is deprecated
        
        // this will add our custom filter to intercept any request before it reaches controller
        .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

    
    return http.build(); // .build() returns the SecurityFilterChain object using the above config stored in HttpSecurity object
	}
}
