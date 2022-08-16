package com.financecontrol.api.model.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AllBalancesResponse {
	
	private String period;
	
	private Double balance;

}
