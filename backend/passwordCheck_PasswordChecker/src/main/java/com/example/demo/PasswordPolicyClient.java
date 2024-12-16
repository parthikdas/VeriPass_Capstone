package com.example.demo;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.demo.DTO.PasswordPolicyDTO;

@FeignClient(name = "user-service")
public interface PasswordPolicyClient {
    @GetMapping("/passwordCheck/api/{key}")
    PasswordPolicyDTO getPasswordPolicy(@PathVariable String key);
}