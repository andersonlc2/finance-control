
-- Cria tabela de transações
CREATE TABLE tb_transaction (
	id SERIAL,
	description VARCHAR(255) NOT NULL,
	debit_or_credit CHAR NOT NULL,
	due_date DATE NOT NULL,
	value DECIMAL(10,2) NOT NULL,
	pay_day DATE NULL,
	status VARCHAR(11) NOT NULL DEFAULT 'PENDENTE',	
	account_id BIGINT NOT NULL,
	PRIMARY KEY (id),
	CONSTRAINT fk_transaction_account
		FOREIGN KEY (account_id) REFERENCES tb_account (id)
);

-- Altera o valor inicial da sequence
ALTER SEQUENCE tb_transaction_id_seq RESTART 10000;


-----------------------------------------------------