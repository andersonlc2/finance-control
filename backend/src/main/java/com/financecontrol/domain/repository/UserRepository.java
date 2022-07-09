package com.financecontrol.domain.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.financecontrol.domain.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	List<User> findByNameContaining(String name);

	Optional<User> findByEmail(String email);
}
