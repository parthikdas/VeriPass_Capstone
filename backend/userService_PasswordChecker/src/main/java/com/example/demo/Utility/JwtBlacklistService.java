package com.example.demo.Utility;

import java.util.HashSet;
import java.util.Set;

import org.springframework.stereotype.Service;

@Service
public class JwtBlacklistService {
	private Set<String> blacklistedTokens = new HashSet<>();
	
	public void blacklistToken(String token) {
		blacklistedTokens.add(token);
	}
	
	public boolean isBlacklistedToken(String token) {
		return blacklistedTokens.contains(token);
	}
}
