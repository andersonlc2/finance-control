package com.financecontrol.domain.exception;

public class UserNotFoundException extends DomainException {

	private static final long serialVersionUID = 1L;

	public UserNotFoundException(String msg) {
		super(msg);
	}
}
