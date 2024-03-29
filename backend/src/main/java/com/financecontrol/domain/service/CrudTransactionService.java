package com.financecontrol.domain.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.financecontrol.domain.exception.DomainException;
import com.financecontrol.domain.exception.NotAuthorizationException;
import com.financecontrol.domain.model.Account;
import com.financecontrol.domain.model.Status;
import com.financecontrol.domain.model.Transaction;
import com.financecontrol.domain.model.Type;
import com.financecontrol.domain.repository.TransactionRepository;
import com.financecontrol.domain.repository.TypeRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class CrudTransactionService {

	private TransactionRepository transactionRepository;

	private SearchAccountService searchAccountService;

	private UserLoggedService userLoggedService;
	
	private TypeRepository typeRepository;

	@Transactional
	public Transaction add(Long accountId, Transaction transaction) {

		Account account = searchAccountService.search(accountId);
		account.modifyBalanceAdd(transaction.getValue(), transaction.getDebitOrCredit());

		Type type = typeRepository.findById(transaction.getType().getId()).get();
		
		
		
		transaction.setAfterBalance(account.getBalance());
		
		transaction.setMonthDate();
		transaction.setYearDate();
		transaction.setType(type);
		transaction.setStatus(Status.PENDENTE);
		transaction.setAccount(account);
		
		return transactionRepository.save(transaction);
	}

	@Transactional
	public Transaction upd(Long accountId, Transaction transaction) {
		Account account = searchAccountService.search(accountId);
		Transaction transactionOld = findById(transaction.getId());

		account.modifyBalanceDel(transactionOld.getValue(), transactionOld.getDebitOrCredit());
		account.modifyBalanceAdd(transaction.getValue(), transaction.getDebitOrCredit());

		Type type = typeRepository.findById(transaction.getType().getId()).get();

		transaction.setAfterBalance(account.getBalance());

		transaction.setMonthDate();
		transaction.setYearDate();
		transaction.setType(type);
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

	public Page<Transaction> find(Pageable pageable, Long accountId, String token) {
		Account account = searchAccountService.search(accountId);

		if (userLoggedService.authUser(token, account.getUser().getId())) {
			return transactionRepository.findByAccount(pageable, account);
		} else {
			throw new NotAuthorizationException("Não autorizado.");
		}
	}

	public Transaction findById(Long transactionId) {
		return transactionRepository.findById(transactionId)
				.orElseThrow(() -> new DomainException("Transação não encontrada!"));
	}
}
