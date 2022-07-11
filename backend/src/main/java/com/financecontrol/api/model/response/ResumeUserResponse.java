package com.financecontrol.api.model.response;

import java.time.OffsetDateTime;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResumeUserResponse {

	private Long id;
	private String name;
	private String email;
	private OffsetDateTime createdAt;
	
	private List<AccountResponse> accounts;

}
