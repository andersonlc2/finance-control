package com.financecontrol.domain.exception;

public class InsufficientBalanceException extends DomainException {

	private static final long serialVersionUID = 1L;

	public InsufficientBalanceException(String msg) {
		super(msg);
	}

}
