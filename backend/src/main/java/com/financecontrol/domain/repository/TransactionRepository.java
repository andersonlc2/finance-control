package com.financecontrol.domain.repository;

import java.time.OffsetDateTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.financecontrol.domain.model.Account;
import com.financecontrol.domain.model.Transaction;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

	Page<Transaction> findByAccount(Pageable pageable, Account account);

	Page<Transaction> findByDueDateBetween(OffsetDateTime startDate, OffsetDateTime endDate, Pageable pageable);
}
