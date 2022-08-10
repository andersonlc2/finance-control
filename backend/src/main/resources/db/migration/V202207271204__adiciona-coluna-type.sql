
ALTER TABLE tb_transaction
	ADD COLUMN type_id BIGINT NOT NULL,
	ADD CONSTRAINT fk_transaction_type
		FOREIGN KEY (type_id) REFERENCES tb_type (id);


-----------------------------------------------------