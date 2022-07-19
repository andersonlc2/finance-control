package com.financecontrol.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.financecontrol.domain.repository.UserRepository;

@Service
@Transactional
public class UserDetailsServiceImpl implements org.springframework.security.core.userdetails.UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		com.financecontrol.domain.model.User user = userRepository.findByEmail(username)
				.orElseThrow(() -> new UsernameNotFoundException("Usuário nao encontrado"));

		return new User(user.getEmail(), user.getPassword(), true, true, true, true, user.getAuthorities());
	}

}
