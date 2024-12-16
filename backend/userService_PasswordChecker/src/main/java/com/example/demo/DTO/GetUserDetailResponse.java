package com.example.demo.DTO;

public class GetUserDetailResponse {
	private String name;
	private String email;
	private String apiKey;
	private PasswordPolicy passwordPolicy;
	
	public String getApiKey() {
		return apiKey;
	}

	public void setApiKey(String apiKey) {
		this.apiKey = apiKey;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public PasswordPolicy getPasswordPolicy() {
		return passwordPolicy;
	}

	public void setPasswordPolicy(PasswordPolicy passwordPolicy) {
		this.passwordPolicy = passwordPolicy;
	}
	
	
	public static class PasswordPolicy {
		private int minLength;
		private int maxLength;
		private boolean requireUpperCase;
		private boolean requireLowerCase;
		private boolean requireDigits;
		private boolean requireSpecialCharacters;
		public int getMinLength() {
			return minLength;
		}
		public void setMinLength(int minLength) {
			this.minLength = minLength;
		}
		public int getMaxLength() {
			return maxLength;
		}
		public void setMaxLength(int maxLength) {
			this.maxLength = maxLength;
		}
		public boolean getRequireUpperCase() {
			return requireUpperCase;
		}
		public void setRequireUpperCase(boolean requireUpperCase) {
			this.requireUpperCase = requireUpperCase;
		}
		public boolean getRequireLowerCase() {
			return requireLowerCase;
		}
		public void setRequireLowerCase(boolean requireLowerCase) {
			this.requireLowerCase = requireLowerCase;
		}
		public boolean getRequireDigits() {
			return requireDigits;
		}
		public void setRequireDigits(boolean requireDigits) {
			this.requireDigits = requireDigits;
		}
		public boolean getRequireSpecialCharacters() {
			return requireSpecialCharacters;
		}
		public void setRequireSpecialCharacters(boolean requireSpecialCharacters) {
			this.requireSpecialCharacters = requireSpecialCharacters;
		}
		
	}
	
}
