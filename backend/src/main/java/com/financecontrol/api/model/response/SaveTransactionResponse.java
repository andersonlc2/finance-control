package com.financecontrol.api.model.response;

import java.time.OffsetDateTime;

import com.financecontrol.domain.model.Status;
import com.financecontrol.domain.model.Type;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SaveTransactionResponse {

	private Long id;
	private String description;
	private String debitOrCredit;
	private OffsetDateTime dueDate;
	private Double value;
	private Status status;
	private Type type;
}
