package com.financecontrol.domain.service;

import java.time.OffsetDateTime;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.financecontrol.domain.exception.DomainException;
import com.financecontrol.domain.model.User;
import com.financecontrol.domain.repository.UserRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class CadastroUserService {

	private UserRepository userRepository;

	@Transactional
	public User save(User user) {
		if (usedEmail(user)) {
			throw new DomainException("Já existe um cadastro com esse e-mail.");
		}

		user.setCreatedAt(OffsetDateTime.now());
		user.setDeletedFlg(0);

		return userRepository.save(user);
	}

	@Transactional
	public void delete(Long userId) {
		userRepository.deleteById(userId);
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
