package com.financecontrol.domain.service;

import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.financecontrol.config.security.JWTAuthFilter;
import com.financecontrol.domain.model.User;
import com.financecontrol.domain.repository.UserRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class UserLoggedService {

	private SearchUserService searchUserService;

	private UserRepository userRepository;
	
	public Boolean authUser(String token, Long userId) {

		String userLogged = JWT.require(Algorithm.HMAC512(JWTAuthFilter.KEY)).build().verify(token).getSubject();

		User user = searchUserService.search(userId);
				
		return userRepository.findByEmail(userLogged).stream().anyMatch(x -> x.equals(user));
	}
}
