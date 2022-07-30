package com.financecontrol.api.controller;

import java.time.OffsetDateTime;

import javax.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
import com.financecontrol.api.model.request.UserRequest;
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

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping
	public Page<ResumeUserResponse> list(Pageable pageable) {
		return userMapper.toCollectionResponse(crudUserService.findAll(pageable));
	}

	@GetMapping("/{userId}")
	public ResponseEntity<ResumeUserResponse> findOne(
			@PathVariable Long userId) {
			return crudUserService.findOneById(userId).map(user -> ResponseEntity.ok(userMapper.toResponse(user)))
				.orElse(ResponseEntity.notFound().build());
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public User add(@Valid @RequestBody UserRequest userRequest) {
		User user = userMapper.toEntity(userRequest);
		user.setCreatedAt(OffsetDateTime.now());

		return crudUserService.save(user);
	}

	@PutMapping("/{userId}")
	public ResponseEntity<User> update(@PathVariable Long userId, @Valid @RequestBody UserRequest userRequest) {
		if (!crudUserService.existsById(userId)) {
			return ResponseEntity.notFound().build();
		}

		User user = userMapper.toEntity(userRequest);
		user.setId(userId);

		return ResponseEntity.ok(crudUserService.save(user));
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
