package com.example.demo.DTO;

public class PasswordPolicyDTO {
	private long id;
	private int minLength;
    private int maxLength;
    private boolean requireUpperCase;
    private boolean requireLowerCase;
    private boolean requireDigits;
    private boolean requireSpecialCharacters;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
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
	public boolean isRequireUpperCase() {
		return requireUpperCase;
	}
	public void setRequireUpperCase(boolean requireUpperCase) {
		this.requireUpperCase = requireUpperCase;
	}
	public boolean isRequireLowerCase() {
		return requireLowerCase;
	}
	public void setRequireLowerCase(boolean requireLowerCase) {
		this.requireLowerCase = requireLowerCase;
	}
	public boolean isRequireDigits() {
		return requireDigits;
	}
	public void setRequireDigits(boolean requireDigits) {
		this.requireDigits = requireDigits;
	}
	public boolean isRequireSpecialCharacters() {
		return requireSpecialCharacters;
	}
	public void setRequireSpecialCharacters(boolean requireSpecialCharacters) {
		this.requireSpecialCharacters = requireSpecialCharacters;
	}
	@Override
	public String toString() {
		return "PasswordPolicyDTO [id=" + id + ", minLength=" + minLength + ", maxLength=" + maxLength
				+ ", requireUpperCase=" + requireUpperCase + ", requireLowerCase=" + requireLowerCase
				+ ", requireDigits=" + requireDigits + ", requireSpecialCharacters=" + requireSpecialCharacters + "]";
	}
    
}
