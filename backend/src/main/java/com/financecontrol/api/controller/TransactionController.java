package com.financecontrol.api.controller;

import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import com.financecontrol.api.model.response.AnnualReportResponse;
import com.financecontrol.domain.service.ChartsTransactionService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.financecontrol.api.assembler.TransactionMapper;
import com.financecontrol.api.model.request.TransactionRequest;
import com.financecontrol.api.model.response.BalanceMonthResponse;
import com.financecontrol.api.model.response.TransactionResponse;
import com.financecontrol.domain.model.Transaction;
import com.financecontrol.domain.repository.TransactionRepository;
import com.financecontrol.domain.service.AgroupTransactionService;
import com.financecontrol.domain.service.BalanceMonthService;
import com.financecontrol.domain.service.CrudTransactionService;
import com.financecontrol.utils.GetToken;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/accounts/{accountId}")
public class TransactionController {

	private CrudTransactionService crudTransactionService;

	private AgroupTransactionService agroupTransactionService;

	private TransactionMapper transactionMapper;
	
	private TransactionRepository transactionRepository;
	
	private GetToken getToken;
	
	private BalanceMonthService balanceMonthService;

	private ChartsTransactionService chartsTransactionService;
	
	@PostMapping
	@ResponseStatus(code = HttpStatus.CREATED)
	public TransactionResponse add(@PathVariable Long accountId,
			@Valid @RequestBody TransactionRequest transactionRequest) {
		Transaction entity = crudTransactionService.add(accountId, transactionMapper.toEntity(transactionRequest));
		
		return transactionMapper.toResponse(entity);
	}

	@GetMapping
	public Page<TransactionResponse> list(Pageable pageable, 
			@PathVariable Long accountId, @RequestHeader Map<String, String> headers) {
				
		Page<Transaction> pages = crudTransactionService.find(pageable, accountId, getToken.get(headers));

		return transactionMapper.toCollectionResponse(pages);
	}

	@GetMapping("/transaction/{transactionId}")
	public ResponseEntity<Transaction> listById(@PathVariable Long transactionId) {
		if (!transactionRepository.existsById(transactionId)) {
			return ResponseEntity.notFound().build();
		}

		Transaction transaction = crudTransactionService.findById(transactionId);

		return ResponseEntity.ok(transaction);
	}

	@PutMapping("/transaction/{transactionId}")
	public ResponseEntity<Transaction> upt(@PathVariable Long accountId, @PathVariable Long transactionId, @RequestBody Transaction transaction) {
		if (!transactionRepository.existsById(transactionId)) {
			return ResponseEntity.notFound().build();
		}
		
		transaction.setId(transactionId);
		crudTransactionService.upd(accountId, transaction);

		return ResponseEntity.ok(transaction);
	}

	@DeleteMapping("/transaction/{transactionId}")
	public ResponseEntity<Transaction> del(@PathVariable Long transactionId) {
		if (!transactionRepository.existsById(transactionId)) {
			return ResponseEntity.notFound().build();
		}

		crudTransactionService.delete(transactionId);

		return ResponseEntity.noContent().build();
	}

	@GetMapping("/date")
	public Page<TransactionResponse> listByDate(
			Pageable pageable,
			@PathVariable Long accountId,
			@RequestParam Integer month,
			@RequestParam Integer year,
			@RequestHeader Map<String, String> headers) {
		var page = agroupTransactionService.findByDate(pageable, accountId, month, year, getToken.get(headers));
		
		var balances = new BalanceMonthResponse();
		balances.setBalanceAfterTransaction(balanceMonthService.getBalanceTransaction(accountId, month, year));

		var pageReponse = transactionMapper.toCollectionResponse(page);		
		
		for (TransactionResponse t : pageReponse) {
			for (Map.Entry<Long, Double> balance : balances.getBalanceAfterTransaction().entrySet()) {
				if (t.getId() == balance.getKey()) {
					t.setAfterBalance(balance.getValue());					
				}
			}
		}
		
		return pageReponse;
	}

	@GetMapping("/balanceMonth")
	public BalanceMonthResponse balances(
			@PathVariable Long accountId,
			@RequestParam Integer month,
			@RequestParam Integer year) {
		var balances = new BalanceMonthResponse();
		balances.setBalanceAfterMonth(balanceMonthService.getBalanceMonth(accountId, month - 1, year));
		balances.setBalanceMonth(balanceMonthService.getBalanceMonth(accountId, month, year));
		balances.setBalanceAfterTransaction(balanceMonthService.getBalanceTransaction(accountId, month, year));
		
		return balances;
	}
	@GetMapping("/annual-report-response")
	public ResponseEntity<List<AnnualReportResponse>> chartsBalanceMonth(Pageable pageable, @RequestHeader Map<String, String> headers) {
		List<AnnualReportResponse> resp = chartsTransactionService.getAnnualReport(pageable, getToken.get(headers));

		return ResponseEntity.ok(resp);
	}
}
