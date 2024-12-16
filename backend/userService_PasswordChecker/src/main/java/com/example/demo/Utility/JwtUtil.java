package com.example.demo.Utility;

import java.security.Key;
import java.util.Date;
import java.util.Map;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import com.example.demo.SecurityConfig.CustomUserDetails;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

	private final String secret = "5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437";
 
	/*	Methods for token generation - starts */
	public String generateToken(CustomUserDetails details) {
		Claims claims = Jwts.claims();
        claims.put("email", details.getUsername());
		return createToken(claims, details.getUsername()); // as email is unique
	}

	public String createToken(Map<String, Object> claims, String subject) {
		return Jwts.builder()
				   .setClaims(claims)
				   .setSubject(subject)
				   .setIssuedAt(new Date(System.currentTimeMillis()))
				   .setExpiration(new Date(System.currentTimeMillis() + 3600000)) // 60min
				   .signWith(getSignKey(), SignatureAlgorithm.HS256)
				   .compact();
	}
	
	private Key getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        return Keys.hmacShaKeyFor(keyBytes);
    }
	/*	Methods for token generation - ends */
	
	/*  Methods for token validation - starts */
	public Claims extractAllClaims(String token) {
		return Jwts.parserBuilder().setSigningKey(getSignKey()).build().parseClaimsJws(token).getBody();
	}
	
	public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    public Boolean isTokenExpired(String token) {
        return extractAllClaims(token).getExpiration().before(new Date());
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
	/*  Methods for token validation - ends */
}
