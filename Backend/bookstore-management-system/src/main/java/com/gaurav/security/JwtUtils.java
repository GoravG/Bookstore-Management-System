package com.gaurav.security;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

import java.security.Key;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

@Component
public class JwtUtils {

	@Value("${SECRET_KEY}")
	private String jwtSecret;

	@Value("${EXP_TIMEOUT}")
	private int jwtExpirationMs;

	private Key key;

	@PostConstruct
	public void init() {
		key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
	}

	public Claims validateJwtToken(String jwtToken) {
		return Jwts.parser().verifyWith((SecretKey) key).build().parseSignedClaims(jwtToken).getPayload();
	}

	public String generateJwtToken(Authentication authentication) {
		CustomUserDetails userPrincipal = (CustomUserDetails) authentication.getPrincipal();
		return Jwts.builder().subject((userPrincipal.getUsername())).issuedAt(new Date())
				.expiration(new Date((new Date()).getTime() + jwtExpirationMs)).claims()
				.add("authorities", userPrincipal.getAuthorities().iterator().next().getAuthority()).and().signWith(key)
				.compact();
	}

	public List<GrantedAuthority> getAuthoritiesFromClaims(Claims claims) {

		String authority = (String) claims.get("authorities");
		List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
		authorities.add(new SimpleGrantedAuthority(authority));
		return authorities;
	}

	public String getUserNameFromJwtToken(Claims claims) {
		return claims.getSubject();
	}

}
