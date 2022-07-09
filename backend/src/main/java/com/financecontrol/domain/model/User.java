package com.financecontrol.domain.model;

import java.time.OffsetDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.financecontrol.api.exceptionhandler.validpass.ValidPassword;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Getter
@Setter
@Entity
@Table(name = "user")
public class User {

	@EqualsAndHashCode.Include
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	@Size(max = 55)
	private String name;

	@NotBlank
	@Size(max = 55, min = 8)
	@Email
	private String email;

	@ValidPassword
	@Size(max = 55)
	@NotNull
	private String password;

	private OffsetDateTime createdAt;

	private Integer deletedFlg;

	private OffsetDateTime deletedAt;

}
