package com.financecontrol.domain.service;

import org.springframework.stereotype.Service;

import com.financecontrol.domain.exception.AccountNotFoundException;
import com.financecontrol.domain.model.Account;
import com.financecontrol.domain.repository.AccountRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class SearchAccountService {

	private AccountRepository accountRepository;

	public Account search(Long accountId) {
		Account account = accountRepository.findById(accountId)
				.orElseThrow(() -> new AccountNotFoundException("Conta não encontrada"));

		return account;
	}
}
