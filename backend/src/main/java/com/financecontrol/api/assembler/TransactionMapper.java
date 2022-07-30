package com.financecontrol.api.assembler;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import com.financecontrol.api.model.request.TransactionRequest;
import com.financecontrol.api.model.response.TransactionResponse;
import com.financecontrol.domain.model.Transaction;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Component
public class TransactionMapper {

	private ModelMapper modelMapper;
	

	public TransactionResponse toResponse(Transaction transaction) {
		return modelMapper.map(transaction, TransactionResponse.class);
	}

	public Page<TransactionResponse> toCollectionResponse(Page<Transaction> page) {
		return page.map(Transaction -> toResponse(Transaction));
	}

	public Transaction toEntity(TransactionRequest transactionRequest) {
		
		
		
		return modelMapper.map(transactionRequest, Transaction.class);
	}

}
