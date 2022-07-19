package com.financecontrol.domain.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.financecontrol.domain.exception.DomainException;
import com.financecontrol.domain.model.User;
import com.financecontrol.domain.repository.UserRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class CrudUserService {

	private UserRepository userRepository;

	@Transactional
	public User save(User user) {
		if (usedEmail(user)) {
			throw new DomainException("Já existe um cadastro com esse e-mail.");
		}

		user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));

		return userRepository.save(user);
	}

	@Transactional
	public void delete(Long userId) {
		User user = userRepository.findById(userId).get();
		user.deleteUser();

		userRepository.save(user);
	}

	public Optional<User> findOneById(Long userId) {
		return userRepository.findById(userId);
	}

	public Page<User> findAll(Pageable pageable) {
		return userRepository.findAll(pageable);
	}

	public Boolean existsById(Long userId) {
		return userRepository.existsById(userId);
	}

	private Boolean usedEmail(User user) {
		return userRepository.findByEmail(user.getEmail()).stream()
				.anyMatch(usedEmailUser -> !usedEmailUser.equals(user));
	}
}
