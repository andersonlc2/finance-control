package com.financecontrol.api.assembler;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.financecontrol.api.model.request.AccountRequest;
import com.financecontrol.api.model.response.AccountResponse;
import com.financecontrol.domain.model.Account;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Component
public class AccountMapper {
	private ModelMapper modelMapper;

	public AccountResponse toResponse(Account account) {
		return modelMapper.map(account, AccountResponse.class);
	}

	public List<AccountResponse> toCollectionResponse(Collection<Account> accounts) {
		return accounts.stream().map(account -> toResponse(account)).collect(Collectors.toList());
	}

	public Account toEntity(AccountRequest accountRequest) {
		return modelMapper.map(accountRequest, Account.class);
	}

}
