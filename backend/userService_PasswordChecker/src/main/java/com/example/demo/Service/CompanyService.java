package com.example.demo.Service;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.Utility.JwtUtil;
import com.example.demo.DTO.GetUserDetailResponse;
import com.example.demo.DTO.RegisterRequest;
import com.example.demo.DTO.UpdateRequest;
import com.example.demo.Entity.Company;
import com.example.demo.Entity.PasswordPolicy;
import com.example.demo.Repository.CompanyRepository;
import com.example.demo.Repository.PasswordPolicyRepository;
import com.example.demo.SecurityConfig.CustomUserDetails;

@Service
public class CompanyService {
	@Autowired
	CompanyRepository comRepo;
	@Autowired
	PasswordPolicyRepository passRepo;
	@Autowired
	PasswordEncoder passwordEncoder; // for password hashing in register
	@Autowired
	AuthenticationManager authenticationManager; // to check for login
	@Autowired
	JwtUtil jwtUtil;
	
	// To find whether the user is registered or not
	public boolean userPresent(String email) {
		Optional<Company> companyFound = comRepo.findByEmail(email);
    	return companyFound.isPresent();
	}
	
	public String verifyToken() {
		try {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			if (authentication != null && authentication.isAuthenticated()) {
	            return "verified";
	        } else {
	        	throw new RuntimeException("Not Verified");
	        }
		} catch (AuthenticationException e) {
			throw new RuntimeException("Not Verified");
		}
	}
		
	// To register a new company
	public String register(RegisterRequest request) {
		// Checking if already existing
		Optional<Company> companyFound = comRepo.findByEmail(request.getEmail());
		if(companyFound.isPresent()) throw new RuntimeException("Company already registered!!");
		// else proceed
		PasswordPolicy passwordPolicy = new PasswordPolicy();
		passwordPolicy.setMinLength(request.getPasswordPolicy().getMinLength());
		passwordPolicy.setMaxLength(request.getPasswordPolicy().getMaxLength());
		passwordPolicy.setRequireUpperCase(request.getPasswordPolicy().getRequireUpperCase());
		passwordPolicy.setRequireLowerCase(request.getPasswordPolicy().getRequireLowerCase());
		passwordPolicy.setRequireDigits(request.getPasswordPolicy().getRequireDigits());
		passwordPolicy.setRequireSpecialCharacters(request.getPasswordPolicy().getRequireSpecialCharacters());
		passRepo.save(passwordPolicy); // save the password
		
		String apiKey = UUID.randomUUID().toString(); // generater a api key

		Company company = new Company();
		company.setName(request.getName());
		company.setEmail(request.getEmail());
		company.setHashPassword(passwordEncoder.encode(request.getPassword())); // Encode the password
		company.setPasswordPolicy(passwordPolicy); // add it to company
		company.setApiKey(apiKey);
		comRepo.save(company);
		
		return apiKey; // return apiKey as response
	}
	
	// For login
	public String login(String email, String password) throws AuthenticationException {
		try {
			Authentication authentication = authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(email, password)
					);
			CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal(); // To print the details of user
			final String jwtToken = jwtUtil.generateToken(customUserDetails);
			return jwtToken;
		} catch (AuthenticationException e) {
			throw new RuntimeException("Invalid username or password");
		}
	}
	
	public GetUserDetailResponse getCompanyDetails() {
		// Get the user details who is authorized
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        // Get all of the details
        Company company = comRepo.findById(userDetails.getId()).get();
        // Create the response
        GetUserDetailResponse response = new GetUserDetailResponse();
        // Setup up the response
        com.example.demo.DTO.GetUserDetailResponse.PasswordPolicy passwordPolicy = new com.example.demo.DTO.GetUserDetailResponse.PasswordPolicy();
		passwordPolicy.setMinLength(company.getPasswordPolicy().getMinLength());
		passwordPolicy.setMaxLength(company.getPasswordPolicy().getMaxLength());
		passwordPolicy.setRequireUpperCase(company.getPasswordPolicy().isRequireUpperCase());
		passwordPolicy.setRequireLowerCase(company.getPasswordPolicy().isRequireLowerCase());
		passwordPolicy.setRequireDigits(company.getPasswordPolicy().isRequireDigits());
		passwordPolicy.setRequireSpecialCharacters(company.getPasswordPolicy().isRequireSpecialCharacters());
		response.setPasswordPolicy(passwordPolicy);
        response.setName(company.getName());
        response.setEmail(company.getEmail());
        response.setApiKey(company.getApiKey());
        
        return response;
	}

	public String updateCompanyDetails(UpdateRequest request) {
		// Get the user details who is authorized
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
		// Get all of the details
        Company company = comRepo.findById(userDetails.getId()).get();
        // Now update
        PasswordPolicy policy = passRepo.findById((company.getPasswordPolicy().getId())).get();
        policy.setMaxLength(request.getMaxLength());
        policy.setMinLength(request.getMinLength());
        policy.setRequireDigits(request.isRequireDigits());
        policy.setRequireLowerCase(request.isRequireLowerCase());
        policy.setRequireUpperCase(request.isRequireUpperCase());
        policy.setRequireSpecialCharacters(request.isRequireSpecialCharacters());
        passRepo.save(policy);
		return "Updated..";
	}
	
	public String forgotPassword(String email) {
		CustomUserDetails custom = new CustomUserDetails(email);
		final String jwtToken = jwtUtil.generateToken(custom);
		return jwtToken;
	}
	
	public String resetPassword(String password) {
		// Get the user details who is authorized
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
		// Get all of the details
        Company company = comRepo.findById(userDetails.getId()).get();
        System.out.println(company.getEmail());
        // Now update
        company.setHashPassword(passwordEncoder.encode(password));
        comRepo.save(company);
		return "Password Changed..";
	}
}
