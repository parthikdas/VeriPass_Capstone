package com.example.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.Service.CompanyService;
import com.example.demo.Utility.JwtBlacklistService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import com.example.demo.DTO.RegisterRequest;
import com.example.demo.DTO.ResetPasswordRequest;
import com.example.demo.DTO.UpdateRequest;

@RestController
@RequestMapping("/auth")
//@CrossOrigin
public class CompanyPolicyAuthController {
	@Autowired
	CompanyService comService;
	
	@Autowired
	JwtBlacklistService jwtBlacklistService;
	
	@PostMapping("/verifyToken")
	public ResponseEntity<?> verifyToken(HttpServletRequest request) {
		try {
			// Extract JWT token from cookies
			Cookie[] cookies = request.getCookies();
			if(cookies != null) {
				return ResponseEntity.ok(comService.verifyToken());
			}
			else return ResponseEntity.ok("No JWT token found in cookies");
		} catch(Exception e) {
			return ResponseEntity.ok(e.getMessage());
		}
	}
	
	@PostMapping("/register")
	public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
		try {
			return ResponseEntity.ok().body(comService.register(request));
		} catch(Exception e) {
			return ResponseEntity.ok(e.getMessage());
		}
	}
	
	@GetMapping("/login")
	public ResponseEntity<?> login(@RequestParam String email, @RequestParam String password, HttpServletResponse response) {
		try {
			String jwtToken = comService.login(email, password);
			Cookie cookie = new Cookie("jwtToken", jwtToken);
            cookie.setHttpOnly(true);
            cookie.setSecure(true); // Set to true if using HTTPS
            cookie.setPath("/");
            cookie.setMaxAge(3600); // 1 hour
            response.addCookie(cookie);
			return ResponseEntity.ok().body("Login Succesful..");
		} catch (Exception e) {
			return ResponseEntity.ok(e.getMessage());
		}
	}
	
	@GetMapping("/user") // To get the details in the profile
	public ResponseEntity<?> getCompanyDetails() {
		try {
			return ResponseEntity.ok().body(comService.getCompanyDetails());
		} catch (Exception e) {
			return ResponseEntity.ok(e.getMessage());
		}
	}
	
	@PutMapping("/user") // To update the details in the profile
	public ResponseEntity<?> updateCompanyDetails(@RequestBody UpdateRequest request) {
		try {
			return ResponseEntity.ok().body(comService.updateCompanyDetails(request));
		} catch (Exception e) {
			return ResponseEntity.ok(e.getMessage());
		}
	}
	
	@PostMapping("/logout")
	public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
//		try {
//			String token = authorizationHeader.substring(7);
//			jwtBlacklistService.blacklistToken(token);
//			return ResponseEntity.ok().body("Logout Successful!!..");
//		} catch (Exception e) {
//			return ResponseEntity.ok(e.getMessage());
//		}
		try {
	        // Extract JWT token from cookies
	        Cookie[] cookies = request.getCookies();
	        if (cookies != null) {
	            for (Cookie cookie : cookies) {
	                if ("jwtToken".equals(cookie.getName())) {
	                    String token = cookie.getValue();
	                    jwtBlacklistService.blacklistToken(token);

	                    // Clear the cookie
	                    Cookie clearCookie = new Cookie("jwtToken", null);
	                    clearCookie.setHttpOnly(true);
	                    clearCookie.setSecure(true); // Set to true if using HTTPS
	                    clearCookie.setPath("/");
	                    clearCookie.setMaxAge(0); // Expire the cookie
	                    response.addCookie(clearCookie);

	                    return ResponseEntity.ok().body("Logout Successful!!..");
	                }
	            }
	        }
	        return ResponseEntity.ok("No JWT token found in cookies");
	    } catch (Exception e) {
	        return ResponseEntity.ok(e.getMessage());
	    }
	}
	
	@PostMapping("/resetPassword")
	public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {
		try {
			return ResponseEntity.ok().body(comService.resetPassword(request.getPassword()));
		} catch (Exception e) {
			return ResponseEntity.ok(e.getMessage());
		}
	}
}
