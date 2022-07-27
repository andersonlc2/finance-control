package com.financecontrol.domain.model;

import java.time.OffsetDateTime;

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
@Table(name = "transaction")
public class Transaction {

	@EqualsAndHashCode.Include
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String description;

	private String debitOrCredit;

	private OffsetDateTime dueDate;

	private Double value;

	private OffsetDateTime payDay;

	@Enumerated(EnumType.STRING)
	private Status status;

	@JsonIgnore
	@ManyToOne
	private Account account;

	@ManyToOne
	private Type type;

}
