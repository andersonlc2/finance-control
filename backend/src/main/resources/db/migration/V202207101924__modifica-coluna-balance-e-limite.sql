
ALTER TABLE tb_account 
	ALTER COLUMN balance TYPE DECIMAL(10,2),
	ALTER COLUMN balance SET NOT NULL,
	ALTER COLUMN balance SET DEFAULT 0.00,
	ALTER COLUMN limite TYPE DECIMAL(10,2),
	ALTER COLUMN limite SET NOT NULL,
	ALTER COLUMN limite SET DEFAULT 0.00;


-----------------------------------------------------