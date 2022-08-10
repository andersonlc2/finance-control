
-- Cria tabela de contas
CREATE TABLE tb_account (
	id SERIAL,
	user_id BIGINT NOT NULL,
	balance DECIMAL(10,2) NOT NULL DEFAULT 0.00,
	PRIMARY KEY (id),
	CONSTRAINT fk_account_user
		FOREIGN KEY (user_id) REFERENCES tb_user (id)
);


----------------------------------------------------