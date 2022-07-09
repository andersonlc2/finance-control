package com.financecontrol.domain.model;

import java.time.OffsetDateTime;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Getter
@Setter
public class User {

	@EqualsAndHashCode.Include
	private Long id;
	private String name;
	private String email;
	private String password;
	private OffsetDateTime createdAt;
	private Boolean deletedFlg;
	private OffsetDateTime deletedAt;

}
