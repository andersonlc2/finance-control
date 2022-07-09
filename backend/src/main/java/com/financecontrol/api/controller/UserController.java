package com.financecontrol.api.controller;

import javax.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.financecontrol.domain.model.User;
import com.financecontrol.domain.service.CadastroUserService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/users")
public class UserController {

	private CadastroUserService cadastroUserService;

	@GetMapping
	public Page<User> list(Pageable pageable) {
		return cadastroUserService.findAll(pageable);
	}

	@GetMapping("/{userId}")
	public ResponseEntity<User> findOne(@PathVariable Long userId) {
		return cadastroUserService.findOneById(userId).map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public User add(@Valid @RequestBody User user) {
		return cadastroUserService.save(user);
	}

	@PutMapping("/{userId}")
	public ResponseEntity<User> update(@PathVariable Long userId, @Valid @RequestBody User user) {
		if (!cadastroUserService.existsById(userId)) {
			return ResponseEntity.notFound().build();
		}

		user.setId(userId);
		user = cadastroUserService.save(user);

		return ResponseEntity.ok(user);
	}

	@DeleteMapping("/{userId}")
	public ResponseEntity<User> del(@PathVariable Long userId) {
		if (!cadastroUserService.existsById(userId)) {
			return ResponseEntity.notFound().build();
		}

		cadastroUserService.delete(userId);

		return ResponseEntity.noContent().build();
	}
}
