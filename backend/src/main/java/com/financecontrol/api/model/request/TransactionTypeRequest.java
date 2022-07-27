package com.financecontrol.api.model.request;

import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TransactionTypeRequest {

	@NotNull
	private Long id;
}
