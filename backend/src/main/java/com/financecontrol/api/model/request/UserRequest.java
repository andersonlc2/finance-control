package com.financecontrol.api.model.request;

import java.time.LocalDate;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.lang.Nullable;

import com.financecontrol.api.exceptionhandler.validpass.ValidPassword;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class UserRequest {

	@NotBlank
	@Size(max = 55)
	private String name;

	@NotBlank
	@Size(max = 55, min = 8)
	@Email
	private String email;

	@NotNull
	@Size(max = 55)
	@ValidPassword
	private String password;

	@Nullable
	private LocalDate createdAt;
}
