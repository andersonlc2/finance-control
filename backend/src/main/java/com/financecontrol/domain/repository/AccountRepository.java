package com.financecontrol.domain.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.financecontrol.domain.model.Account;
import com.financecontrol.domain.model.User;

import java.util.List;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

	Page<Account> findByUser(Pageable pageable, User user);

	List<Account> findByUser(User user);
}
