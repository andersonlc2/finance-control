package com.financecontrol.domain.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.financecontrol.domain.model.Account;
import com.financecontrol.domain.model.Transaction;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

	Page<Transaction> findByAccount(Pageable pageable, Account account);

	@Query("SELECT u FROM Transaction u WHERE u.account = :account and u.year = :year and u.month = :month ORDER BY u.dueDate")
	Page<Transaction> findByDate(
			Pageable pageable,
			Account account,
			Integer month, 
			Integer year);
	
	@Query("SELECT u FROM Transaction u WHERE u.account = :account and u.year = :year and u.month = :month ORDER BY u.dueDate")
	List<Transaction> findByDate(
			Account account,
			Integer month, 
			Integer year);
}
