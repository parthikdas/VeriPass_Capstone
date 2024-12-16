package com.example.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.CheckRequest;
import com.example.demo.Service.PasswordPolicyService;

@RestController
@RequestMapping("/userPasswordCheck")
//@CrossOrigin
public class PasswordCheckController {

	@Autowired
	PasswordPolicyService service;
	
	@PostMapping("/api")
    public ResponseEntity<?> checkPassword(@RequestBody CheckRequest request) {
        try {
        	System.out.println(request);
            return ResponseEntity.ok(service.fetchPasswordPolicy(request));
        } catch (Exception e) {
            return ResponseEntity.ok().body(e.getMessage());
        }
    }
	
	@GetMapping("test") 
	public String testApi() {
		return "Success";
	}
}
