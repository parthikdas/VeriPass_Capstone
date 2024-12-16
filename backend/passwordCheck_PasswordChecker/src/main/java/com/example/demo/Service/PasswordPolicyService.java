package com.example.demo.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.PasswordPolicyClient;
import com.example.demo.DTO.CheckRequest;
import com.example.demo.DTO.PasswordPolicyDTO;

@Service
public class PasswordPolicyService {
	@Autowired
    PasswordPolicyClient passwordPolicyClient;

    public boolean fetchPasswordPolicy(CheckRequest request) {
    	try {
    		PasswordPolicyDTO passwordPolicyResponse = passwordPolicyClient.getPasswordPolicy(request.getApiKey());
    		System.out.println(passwordPolicyResponse.toString());
    		// Use regex to check password and return the boolean result
    		String requestPassword = request.getPassword();
    		// First length check
    		if(requestPassword.length() < passwordPolicyResponse.getMinLength() || requestPassword.length() > passwordPolicyResponse.getMaxLength()) return false;
    		// Digit check
    		if(passwordPolicyResponse.isRequireDigits()) {
    			if(requestPassword.matches(".*[0-9].*") == false) return false;
    		}
    		// Lowercase check
    		if(passwordPolicyResponse.isRequireLowerCase()) {
    			if(requestPassword.matches(".*[a-z].*") == false) return false;
    		}
    		// Uppercase check
    		if(passwordPolicyResponse.isRequireUpperCase()) {
    			if(requestPassword.matches(".*[A-Z].*") == false) return false;
    		}
    		// Special char check
    		if(passwordPolicyResponse.isRequireSpecialCharacters()) {
    			if(requestPassword.matches(".*[^\\w].*") == false) return false;
    		}
    		return true;
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage());
		}
    }
}
