
-- Cria tabela de tipos
CREATE TABLE tb_type (
	id SERIAL,
	name VARCHAR(255) NOT NULL UNIQUE,
	PRIMARY KEY (id)
);


-----------------------------------------------------