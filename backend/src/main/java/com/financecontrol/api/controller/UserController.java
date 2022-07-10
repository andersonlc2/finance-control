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

import com.financecontrol.api.assembler.UserMapper;
import com.financecontrol.api.model.response.ResumeUserResponse;
import com.financecontrol.domain.model.User;
import com.financecontrol.domain.service.CrudUserService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/users")
public class UserController {

	private CrudUserService crudUserService;

	private UserMapper userMapper;

	@GetMapping
	public Page<ResumeUserResponse> list(Pageable pageable) {
		return userMapper.toCollectionResponse(crudUserService.findAll(pageable));
	}

	@GetMapping("/{userId}")
	public ResponseEntity<ResumeUserResponse> findOne(@PathVariable Long userId) {
		return crudUserService.findOneById(userId).map(user -> ResponseEntity.ok(userMapper.toResponse(user)))
				.orElse(ResponseEntity.notFound().build());
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public User add(@Valid @RequestBody User user) {
		return crudUserService.save(user);
	}

	@PutMapping("/{userId}")
	public ResponseEntity<User> update(@PathVariable Long userId, @Valid @RequestBody User user) {
		if (!crudUserService.existsById(userId)) {
			return ResponseEntity.notFound().build();
		}

		user.setId(userId);
		user = crudUserService.save(user);

		return ResponseEntity.ok(user);
	}

	@DeleteMapping("/{userId}")
	public ResponseEntity<User> del(@PathVariable Long userId) {
		if (!crudUserService.existsById(userId)) {
			return ResponseEntity.notFound().build();
		}

		crudUserService.delete(userId);

		return ResponseEntity.noContent().build();
	}
}
