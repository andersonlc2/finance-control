package com.financecontrol.api.controller;

import java.time.OffsetDateTime;
import java.util.Arrays;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.financecontrol.domain.model.User;

@RestController
@RequestMapping("/users")
public class UserController {

	@GetMapping
	public List<User> list() {

		User user1 = new User();
		user1.setId(1L);
		user1.setName("Anderson Luiz Correia");
		user1.setEmail("acorreia610@gmail.com");
		user1.setPassword("ASÇLDKJHF1ASKLDJF1");
		user1.setCreatedAt(OffsetDateTime.now());
		user1.setDeletedFlg(false);
		user1.setDeletedAt(null);

		User user2 = new User();
		user2.setId(2L);
		user2.setName("Leide de Rezende Correia");
		user2.setEmail("leiderezende@hotmail.com");
		user2.setPassword("AADDA15A3SDAD1FAS5");
		user2.setCreatedAt(OffsetDateTime.now());
		user2.setDeletedFlg(false);
		user2.setDeletedAt(null);

		return Arrays.asList(user1, user2);
	}
}
