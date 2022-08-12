package com.financecontrol.domain.model;

import java.sql.Date;
import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Getter
@Setter
@Entity
@Table(name = "tb_transaction")
public class Transaction {

	@EqualsAndHashCode.Include
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String description;

	private String debitOrCredit;

	private LocalDate dueDate;

	private Double value;

	private LocalDate payDay;

	@Enumerated(EnumType.STRING)
	private Status status;

	@JsonIgnore
	@ManyToOne
	private Account account;

	@ManyToOne
	private Type type;

	private Integer month;
	
	private Integer year;
	
	private Double afterBalance;

	
	public void setMonthDate() {
		this.setMonth(this.getDueDate().getMonthValue() - 1);
	}
	
	public void setYearDate() {
		this.setYear(this.getDueDate().getYear());
	}
}
