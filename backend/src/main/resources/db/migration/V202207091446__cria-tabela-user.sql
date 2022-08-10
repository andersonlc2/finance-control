
-- Cria tabela de usuários
CREATE TABLE tb_user (
	id SERIAL,
	name VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	created_at DATE NOT NULL,
	deleted_flg INT NOT NULL DEFAULT '0',
	deleted_at DATE NULL,
	PRIMARY KEY (id)
);

-- Altera o valor inicial da sequence
ALTER SEQUENCE tb_user_id_seq RESTART 1000;


---------------------------------------------------
