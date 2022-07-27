package com.financecontrol.api.controller;

import java.util.Collection;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.financecontrol.domain.model.Type;
import com.financecontrol.domain.repository.TypeRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping(value = "/transactions-type")
public class TypeController {

	private TypeRepository typeRepository;

	@GetMapping
	public Collection<Type> findall() {
		return typeRepository.findAll();
	}
}
