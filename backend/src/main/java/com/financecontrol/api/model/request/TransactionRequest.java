package com.financecontrol.api.model.request;

import java.time.OffsetDateTime;

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

	@NotBlank
	private String description;

	@NotBlank
	@Size(max = 1)
	private String debitOrCredit;

	@NotNull
	private OffsetDateTime dueDate;

	@NotNull
	private Double value;
}
