package com.financecontrol.api.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.financecontrol.api.assembler.AccountMapper;
import com.financecontrol.api.model.request.AccountRequest;
import com.financecontrol.api.model.response.AccountResponse;
import com.financecontrol.domain.model.Account;
import com.financecontrol.domain.model.User;
import com.financecontrol.domain.service.SearchUserService;
import com.financecontrol.domain.service.StartAccountService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/users/{userId}/accounts")
public class AccountController {

	private StartAccountService startAccountService;

	private SearchUserService searchUserService;

	private AccountMapper accountMapper;

	@GetMapping
	public List<AccountResponse> list(@PathVariable Long userId) {
		User user = searchUserService.search(userId);

		return accountMapper.toCollectionResponse(user.getAccounts());
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public AccountResponse start(@PathVariable Long userId, @Valid @RequestBody AccountRequest accountRequest) {
		Account account = startAccountService.startAccount(userId, accountMapper.toEntity(accountRequest));

		return accountMapper.toResponse(account);
	}
}
