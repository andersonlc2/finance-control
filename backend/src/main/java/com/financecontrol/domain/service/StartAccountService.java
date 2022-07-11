package com.financecontrol.domain.service;

import org.springframework.stereotype.Service;

import com.financecontrol.domain.model.Account;
import com.financecontrol.domain.model.User;
import com.financecontrol.domain.repository.AccountRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class StartAccountService {

	private AccountRepository accountRepository;

	private SearchUserService searchUserService;

	public Account startAccount(Long userId, Account account) {

		User user = searchUserService.search(userId);

		account.setUser(user);
		account.setBalance(0.0);
		account.setLimit(0.0);

		return accountRepository.save(account);
	}

}
