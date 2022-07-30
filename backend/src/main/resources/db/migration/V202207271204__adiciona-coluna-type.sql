ALTER TABLE transaction
	ADD COLUMN type_id BIGINT NOT NULL;


ALTER TABLE transaction
	ADD CONSTRAINT fk_transaction_type
		FOREIGN KEY (type_id) REFERENCES `type` (id);
