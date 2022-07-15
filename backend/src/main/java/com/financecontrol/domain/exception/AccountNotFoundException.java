package com.financecontrol.domain.exception;

public class AccountNotFoundException extends DomainException {

	private static final long serialVersionUID = 1L;

	public AccountNotFoundException(String msg) {
		super(msg);
	}

}
