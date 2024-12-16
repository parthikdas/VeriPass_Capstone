package com.example.demo.SecurityConfig;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.demo.Entity.Company;

public class CustomUserDetails implements UserDetails{
	private long id;
	private String username; // email
	private String password; // password
	
	public CustomUserDetails(Company company) {
		this.id = company.getId();
		this.username = company.getEmail();
		this.password = company.getHashPassword();
	}
	
	// Just a dummy made for forgot password
	public CustomUserDetails(String email) {
		this.id = 0;
		this.username = email;
		this.password = null;
	}
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return null;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return username;
	}
	
	public long getId() {
		return id;
	}
}
