package com.example.demo.SecurityConfig;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.example.demo.Entity.Company;
import com.example.demo.Repository.CompanyRepository;

@Component
public class CustomUserDetailsService implements UserDetailsService{
	
	@Autowired
	CompanyRepository comRepo;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<Company> company = comRepo.findByEmail(username);
		return company.map(CustomUserDetails::new).orElseThrow(() -> new UsernameNotFoundException("No Company found with that email!!"));
	}

}
