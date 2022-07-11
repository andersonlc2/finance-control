package com.financecontrol.api.model.request;

import javax.validation.constraints.NotNull;

import com.financecontrol.domain.model.AccountType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class AccountRequest {

	@NotNull
	private AccountType accountType;

	private Double balance;

	private Double limit;
}
