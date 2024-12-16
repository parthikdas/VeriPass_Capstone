package com.example.demo.Controller;
import java.security.SecureRandom;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.Service.CompanyService;
import com.example.demo.Service.EmailService;

@RestController
@RequestMapping("/otp")
//@CrossOrigin
public class OtpController {
    @Autowired
    private EmailService emailService;
    
    @Autowired
    CompanyService companyService;
    
    private Map<String, String> otpStore = new HashMap<>();
    private SecureRandom random = new SecureRandom();

    @PostMapping("/generate-otp")
    public String generateOtp(@RequestParam("email") String email) throws Exception {
        String otp = String.format("%06d", random.nextInt(999999));
        otpStore.put(email, otp);
        emailService.sendEmail(email, "Your OTP Code", "Your OTP code is " + otp);
        return "OTP sent";
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyOtp(@RequestParam String email, @RequestParam String otp) {
        String storedOtp = otpStore.get(email);
        if (storedOtp != null && storedOtp.equals(otp)) {
        	return ResponseEntity.ok("OTP verified");
        } else { 
        	return ResponseEntity.ok("Invalid or expired OTP");
        }
    }
    
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestParam String email, @RequestParam String otp) {
    	// First check whether the user is 
    	if(companyService.userPresent(email)) {
    		// Now check for the otp
    		String storedOtp = otpStore.get(email);
        	if (storedOtp != null && storedOtp.equals(otp)) {
        		// Now return jwt token
            	return ResponseEntity.ok(companyService.forgotPassword(email));
            } else { 
            	return ResponseEntity.ok("Invalid or expired OTP");
            }
    	} else {
    		return ResponseEntity.ok("Email not found!!");
    	}
    }
}
