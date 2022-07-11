package com.financecontrol.api.model.response;

import com.financecontrol.domain.model.AccountType;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AccountResponse {

	private Long id;
	private AccountType accountType;
	private Double balance;
	private Double limit;
}
