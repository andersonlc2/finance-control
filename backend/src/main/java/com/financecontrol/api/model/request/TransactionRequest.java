package com.financecontrol.api.model.request;

import java.time.LocalDate;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class TransactionRequest {

	private String description;

	@NotBlank
	@Size(max = 1)
	private String debitOrCredit;

	@NotNull
	private LocalDate dueDate;

	@NotNull
	private Double value;
	
	@Valid
	@NotNull
	private TransactionTypeRequest type;
}
