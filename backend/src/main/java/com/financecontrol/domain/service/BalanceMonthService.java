package com.financecontrol.domain.service;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.financecontrol.api.model.response.AllBalancesResponse;
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
	
	public Map<Long, Double> getBalanceTransaction(Long accountId, Integer month, Integer year) {
		Account account = searchAccountService.search(accountId);
		List<Transaction> transaction = transactionRespository.findByDate(account, month, year);
		
		Map<Long, Double> list = new HashMap<>();
		// Double balance = getBalanceMonth(accountId, month -1, year);
		// var balanceActual = balance;
		var balanceActual = 0.0;
		for (Transaction t : transaction) {
			if (t.getDebitOrCredit().equals("C")) {
				balanceActual += t.getValue();
				list.put(t.getId(), balanceActual);
			} else {
				balanceActual -= t.getValue();
				list.put(t.getId(), balanceActual);
			}
		}
		
		return list;
	}

	public Double getMonthExpenses(Long accountId, Integer month) {
		Account account = searchAccountService.search(accountId);
		List<Transaction> transactions = transactionRespository.findByDate(account, month, OffsetDateTime.now().getYear());

		return transactions.stream()
				.filter(transaction -> transaction.getDebitOrCredit().equals("D"))
				.map(Transaction::getValue)
				.reduce(0.0, Double::sum);
	}

	public Double getMonthIncome(Long accountId, Integer month) {
		Account account = searchAccountService.search(accountId);
		List<Transaction> transactions = transactionRespository.findByDate(account, month, OffsetDateTime.now().getYear());

		return transactions.stream()
				.filter(transaction -> transaction.getDebitOrCredit().equals("C"))
				.map(Transaction::getValue)
				.reduce(0.0, Double::sum);
	}
	
	public List<AllBalancesResponse> getAllBalances(Long accountId) {
		var month = 0;
		var year = OffsetDateTime.now().getYear() - 3;
		
		List<AllBalancesResponse> listResp = new ArrayList<>();
		
		for (int i = year; i <= OffsetDateTime.now().getYear(); i++) {
				for (int m = month; m <= 11; m++) {
					var balancesResponse = new AllBalancesResponse();
					balancesResponse.setPeriod(String.format("%d/%d", m, i));
					balancesResponse.setBalance(this.getBalanceMonth(accountId, m, i));	
					listResp.add(balancesResponse);
			}
		}		
		
		return listResp;
	}
}
