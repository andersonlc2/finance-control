package com.financecontrol.domain.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.financecontrol.domain.model.Account;
import com.financecontrol.domain.model.Transaction;
import com.financecontrol.domain.repository.TransactionRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class BalanceMonthService {

	private TransactionRepository transactionRespository;
	
	private SearchAccountService searchAccountService;
	
	public Double getBalanceMonth(Long accountId, Integer month, Integer year) {
		Account account = searchAccountService.search(accountId);
		List<Transaction> transaction = transactionRespository.findByDate(account, month, year);
		
		Double balance = 0.0;
		for (Transaction t : transaction) {
			if (t.getDebitOrCredit().equals("C")) {
				balance += t.getValue();
			} else {
				balance -= t.getValue();
			}
		}
		
		return balance;
	}
	
	public List<Double> getBalanceTransaction(Long accountId, Integer month, Integer year) {
		Account account = searchAccountService.search(accountId);
		List<Transaction> transaction = transactionRespository.findByDate(account, month, year);
		
		Double balance = getBalanceMonth(accountId, month -1, year);
		List<Double> list = new ArrayList<>();
		for (Transaction t : transaction) {
			if (t.getDebitOrCredit().equals("C")) {
				list.add(balance + t.getValue());
			} else {
				list.add(balance - t.getValue());
			}
		}
		
		return list;
	}
}
