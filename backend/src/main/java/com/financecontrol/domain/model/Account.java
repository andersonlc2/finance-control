package com.financecontrol.domain.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Getter
@Setter
@Entity
@Table(name = "account")
public class Account {

	@EqualsAndHashCode.Include
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@JsonIgnore
	@ManyToOne
	private User user;

	@Enumerated(EnumType.STRING)
	private AccountType accountType;

	private Double balance;

	@Column(name = "limite")
	private Double limit;

	@OneToMany(mappedBy = "account", cascade = CascadeType.ALL)
	private List<Transaction> transactions = new ArrayList<>();

	public void modifyBalanceAdd(Double value, String transaction) {
		if (transaction.equals("D")) {
			this.setBalance(this.getBalance() - value);
		} else {
			this.setBalance(this.getBalance() + value);
		}
	}

	public void modifyBalanceDel(Double value, String transaction) {
		if (transaction.equals("D")) {
			this.setBalance(this.getBalance() + value);
		} else {
			this.setBalance(this.getBalance() - value);
		}
	}

}
