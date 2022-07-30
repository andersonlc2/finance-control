package com.financecontrol.api.model.response;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BalanceMonthResponse {
	
	private Double balanceAfterMonth;

	private List<Double> balanceAfterTransaction = new ArrayList<>();

	private Double balanceMonth;
}
