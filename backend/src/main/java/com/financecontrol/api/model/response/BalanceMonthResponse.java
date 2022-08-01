package com.financecontrol.api.model.response;

import java.util.HashMap;
import java.util.Map;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BalanceMonthResponse {
	
	private Double balanceAfterMonth;

	private Map<Long, Double> balanceAfterTransaction = new HashMap<>();

	private Double balanceMonth;
}
