package com.example.demo.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;

@Entity
public class PasswordPolicy {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@NotNull
	private int minLength;
	@NotNull
	private int maxLength;
	@NotNull
	private boolean requireUpperCase;
	@NotNull
	private boolean requireLowerCase;
	@NotNull
	private boolean requireDigits;
	@NotNull
	private boolean requireSpecialCharacters;
	
	// remove later as lombok is there
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
}
