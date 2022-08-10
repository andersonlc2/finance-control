
-- Cria tabela de usuários roles rel
CREATE TABLE tb_users_roles_rel (
	user_id BIGINT NOT NULL,
	role_id BIGINT NOT NULL,
	CONSTRAINT fk_users_roles
		FOREIGN KEY (user_id) REFERENCES tb_user (id),
	CONSTRAINT fk_roles_users
		FOREIGN KEY (role_id) REFERENCES tb_role (id)
);


-----------------------------------------------------