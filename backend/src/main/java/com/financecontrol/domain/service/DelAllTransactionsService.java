package com.financecontrol.domain.service;

import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.financecontrol.domain.model.Account;
import com.financecontrol.domain.repository.AccountRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class DelAllTransactionsService {

	private SearchAccountService searchAccountService;

	private CrudTransactionService crudTransactionService;

	private AccountRepository accountRepository;


	public void delAllTransactions(Long accountId) {
		Account account = searchAccountService.search(accountId);

		account.setBalance(0.0);

		var lista = account.getTransactions().stream().map(x -> x.getId()).collect(Collectors.toList());

		for (Long id : lista) {
			crudTransactionService.delete(id);
		}

		accountRepository.save(account);

	}
}
