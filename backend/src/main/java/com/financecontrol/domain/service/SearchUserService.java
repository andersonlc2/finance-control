package com.financecontrol.domain.service;

import org.springframework.stereotype.Service;

import com.financecontrol.domain.exception.UserNotFoundException;
import com.financecontrol.domain.model.User;
import com.financecontrol.domain.repository.UserRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class SearchUserService {

	private UserRepository userRepository;

	public User search(Long userId) {
		User user = userRepository.findById(userId)
				.orElseThrow(() -> new UserNotFoundException("Usuário não encontrado"));

		return user;
	}
}
