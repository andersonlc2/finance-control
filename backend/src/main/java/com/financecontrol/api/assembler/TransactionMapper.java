package com.financecontrol.api.assembler;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import com.financecontrol.api.model.request.TransactionRequest;
import com.financecontrol.api.model.response.SaveTransactionResponse;
import com.financecontrol.domain.model.Transaction;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Component
public class TransactionMapper {

	private ModelMapper modelMapper;
	

	public SaveTransactionResponse toResponse(Transaction transaction) {
		return modelMapper.map(transaction, SaveTransactionResponse.class);
	}

	public Page<SaveTransactionResponse> toCollectionResponse(Page<Transaction> page) {
		return page.map(Transaction -> toResponse(Transaction));
	}

	public Transaction toEntity(TransactionRequest transactionRequest) {
		
		
		
		return modelMapper.map(transactionRequest, Transaction.class);
	}

}
