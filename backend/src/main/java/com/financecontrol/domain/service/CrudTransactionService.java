package com.financecontrol.domain.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.financecontrol.domain.exception.DomainException;
import com.financecontrol.domain.model.Account;
import com.financecontrol.domain.model.Status;
import com.financecontrol.domain.model.Transaction;
import com.financecontrol.domain.repository.TransactionRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class CrudTransactionService {

	private TransactionRepository transactionRepository;

	private SearchAccountService searchAccountService;

	@Transactional
	public Transaction add(Long accountId, Transaction transaction) {

		Account account = searchAccountService.search(accountId);
		account.modifyBalanceAdd(transaction.getValue(), transaction.getDebitOrCredit());

		transaction.setStatus(Status.PENDENTE);
		transaction.setAccount(account);

		return transactionRepository.save(transaction);
	}

	@Transactional
	public void delete(Long transactionId) {
		Transaction transaction = findById(transactionId);
		Account account = searchAccountService.search(transaction.getAccount().getId());

		account.modifyBalanceDel(transaction.getValue(), transaction.getDebitOrCredit());

		transactionRepository.deleteById(transactionId);
	}

	public Page<Transaction> find(Pageable pageable, Long accountId) {
		Account account = searchAccountService.search(accountId);

		return transactionRepository.findByAccount(pageable, account);
	}

	public Transaction findById(Long transactionId) {
		return transactionRepository.findById(transactionId)
				.orElseThrow(() -> new DomainException("Transação não encontrada!"));
	}
}
