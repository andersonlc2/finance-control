package com.financecontrol.domain.service;

import org.springframework.stereotype.Service;

import com.financecontrol.domain.exception.TransactionTypeNotFoundException;
import com.financecontrol.domain.model.Type;
import com.financecontrol.domain.repository.TypeRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class SearchTransactionTypeService {

	private TypeRepository typeRepository;
	
	public Type search(String name) {
		return typeRepository.findByName(name)
				.orElseThrow(() -> new TransactionTypeNotFoundException("Tipo não encontrado."));
	}
}
