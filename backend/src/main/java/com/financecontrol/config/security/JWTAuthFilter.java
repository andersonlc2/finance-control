package com.financecontrol.config.security;

import java.io.IOException;
import java.util.Date;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.financecontrol.api.assembler.UserMapper;
import com.financecontrol.domain.model.User;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class JWTAuthFilter extends UsernamePasswordAuthenticationFilter {

	public static final long JWT_EXP = 60 * 60 * 60 * 2;

	public static final String KEY = "6f693008-afeb-49a2-be35-a76a5f451d7e";

	private AuthenticationManager authenticationManager;

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
		try {
			User user = new ObjectMapper().readValue(request.getInputStream(), User.class);

			return authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
		} catch (IOException e) {
			throw new RuntimeException("Falha ao autenticar usuário", e);
		}
	}

	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication authResult) throws IOException, ServletException {

		UserMapper userMapper = new UserMapper(new ModelMapper());

		User user = userMapper
				.toPrincipalUser((org.springframework.security.core.userdetails.User) authResult.getPrincipal());

		String token = JWT.create().withSubject(user.getEmail())
				.withExpiresAt(new Date(System.currentTimeMillis() + JWT_EXP)).sign(Algorithm.HMAC512(KEY));
		
		response.getWriter().write(token);
		response.getWriter().flush();
	}

}
