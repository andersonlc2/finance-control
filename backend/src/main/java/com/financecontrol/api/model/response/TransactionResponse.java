package com.financecontrol.api.model.response;

import java.time.LocalDate;

import com.financecontrol.domain.model.Status;
import com.financecontrol.domain.model.Type;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TransactionResponse {

	private Long id;
	private String description;
	private String debitOrCredit;
	private LocalDate dueDate;
	private Double value;
	private Status status;
	private Type type;
	private Double afterBalance;
}
