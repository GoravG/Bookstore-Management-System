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

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
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
		System.out.println("In Validate Token");
		log.info("In Validate");
//		Claims claims = Jwts.parser().setSigningKey(key).build().parseClaimsJws(jwtToken).getBody();
//		Claims c=Jwts.parser().setSigningKey(key).build().parseClaimsJws(jwtToken).getBody();
//		Claims cl=(Claims) Jwts.parser().verifyWith((SecretKey) key).build().parseSignedClaims(jwtToken);
//		return c;
//		Claims claims = Jwts.parserBuilder().setSigningKey(key).build().
//				// Sets the signing key used to verify JWT digital signature.
//						parseClaimsJws(jwtToken).getBody();// Parses the signed JWT returns the resulting Jws<Claims> instance
//				// throws exc in case of failures in verification
//				return claims;
		return Jwts.parser().verifyWith((SecretKey) key).build().parseSignedClaims(jwtToken).getPayload();
	}

	public String generateJwtToken(Authentication authentication) {
//		log.info("generate jwt token " + authentication);
//		System.out.println("Generate JWT for : " + authentication);
//		CustomUserDetails userPrincipal = (CustomUserDetails) authentication.getPrincipal();
////JWT : userName,issued at ,exp date,digital signature(does not typically contain password , can contain authorities
//		return Jwts.builder() // JWTs : a Factory class , used to create JWT tokens
//				.setSubject((userPrincipal.getUsername())) // setting subject part of the token(typically user
//															// name/email)
//				.setIssuedAt(new Date())// Sets the JWT Claims iat (issued at) value of current date
//				.setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))// Sets the JWT Claims exp
//																					// (expiration) value.
//				// setting a custom claim
//				.claim("authorities", getAuthoritiesInString(userPrincipal.getAuthorities()))
//				.signWith(key, SignatureAlgorithm.HS512) // Signs the constructed JWT using the specified
//															// algorithm with the specified key, producing a
//															// JWS(Json web signature=signed JWT)
//
//				// Using token signing algo : HMAC using SHA-512
//				.compact();// Actually builds the JWT and serializes it to a compact, URL-safe string
		CustomUserDetails userPrincipal = (CustomUserDetails) authentication.getPrincipal();
		System.out.println("Autorities:" + userPrincipal.getAuthorities().iterator().next().getAuthority());
		return Jwts.builder().subject((userPrincipal.getUsername())).issuedAt(new Date())
				.expiration(new Date((new Date()).getTime() + jwtExpirationMs)).claims()
				.add("authorities", userPrincipal.getAuthorities().iterator().next().getAuthority()).and().signWith(key)
				.compact();
	}

	public List<GrantedAuthority> getAuthoritiesFromClaims(Claims claims) {
		// Collection authos = (Collection) claims.get("authorities");
		String authority = (String) claims.get("authorities");
//		String authority=(String) ((Map<String, Object>) authos.iterator().next()).get("authority");
		List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
		authorities.add(new SimpleGrantedAuthority(authority));
		return authorities;
	}

	public String getUserNameFromJwtToken(Claims claims) {
		return claims.getSubject();
	}

}
