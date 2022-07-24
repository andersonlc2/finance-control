package com.financecontrol.domain.service;

import org.springframework.stereotype.Service;

import com.financecontrol.domain.model.User;
import com.financecontrol.domain.repository.UserRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class UserLoggedService {

	private SearchUserService searchUserService;

	private UserRepository userRepository;
	
	public Boolean authUser(String userLogged, Long userId) {

		User user = searchUserService.search(userId);
				
		return userRepository.findByEmail(userLogged).stream().anyMatch(x -> x.equals(user));
	}
}
