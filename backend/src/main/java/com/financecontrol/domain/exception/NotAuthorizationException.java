package com.financecontrol.domain.exception;

public class NotAuthorizationException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public NotAuthorizationException(String msg) {
		super(msg);
	}
}
