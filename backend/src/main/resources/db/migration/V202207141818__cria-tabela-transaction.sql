CREATE TABLE transaction (
	id BIGINT NOT NULL AUTO_INCREMENT,
	description VARCHAR(255) NOT NULL,
	debit_or_credit CHAR NOT NULL,
	due_date DATETIME NOT NULL,
	value DECIMAL(10,2) NOT NULL,
	pay_day DATETIME NULL,
	status VARCHAR(11) NOT NULL DEFAULT 'PENDENTE',	
	account_id BIGINT NOT NULL,
	
	PRIMARY KEY (id),
	CONSTRAINT fk_transaction_account
		FOREIGN KEY (account_id) REFERENCES account (id)
);

ALTER TABLE transaction AUTO_INCREMENT = 1000;
