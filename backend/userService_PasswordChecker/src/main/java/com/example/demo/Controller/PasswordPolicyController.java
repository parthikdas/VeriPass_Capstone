package com.example.demo.Controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.Company;
import com.example.demo.Entity.PasswordPolicy;
import com.example.demo.Repository.CompanyRepository;

@RestController
@RequestMapping("/passwordCheck")
//@CrossOrigin
public class PasswordPolicyController {
	@Autowired
	CompanyRepository comRepo;
    @GetMapping("/api/{key}")
    public PasswordPolicy getPasswordPolicy(@PathVariable String key) {
    	Optional<Company> passwordPolicy = comRepo.findByApiKey(key);
		if(passwordPolicy.isPresent()) {
			return passwordPolicy.get().getPasswordPolicy();
		} else {
			throw new RuntimeException("Invalid api key!!");
		}
    }
}
