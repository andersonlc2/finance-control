package com.financecontrol.domain.exception;

public class TransactionTypeNotFoundException extends DomainException {

	private static final long serialVersionUID = 1L;

	public TransactionTypeNotFoundException(String msg) {
		super(msg);
	}

}
