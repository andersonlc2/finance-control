package com.financecontrol.domain.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.financecontrol.domain.exception.NotAuthorizationException;
import com.financecontrol.domain.model.Account;
import com.financecontrol.domain.model.Transaction;
import com.financecontrol.domain.repository.TransactionRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class AgroupTransactionService {

	private TransactionRepository transactionRepository;

	private SearchAccountService searchAccountService;

	private UserLoggedService userLoggedService;

	public Page<Transaction> findByDate(Pageable pageable, Long accountId, Integer month, Integer year, String token) {

		Account account = searchAccountService.search(accountId);

		if (userLoggedService.authUser(token, account.getUser().getId())) {
			return transactionRepository.findByDate(pageable, account, month, year);
		} else {
			throw new NotAuthorizationException("Não autorizado.");
		}

	}
}
