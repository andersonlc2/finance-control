package com.financecontrol.domain.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.financecontrol.domain.model.Type;

@Repository
public interface TypeRepository extends JpaRepository<Type, Long> {

	Optional<Type> findByName(String name);
}
