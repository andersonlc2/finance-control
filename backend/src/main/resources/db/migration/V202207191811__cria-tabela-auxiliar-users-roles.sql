CREATE TABLE users_roles (
	user_id BIGINT NOT NULL,
	role_id BIGINT NOT NULL,
	
	CONSTRAINT fk_users_roles
		FOREIGN KEY (user_id) REFERENCES `user` (id),
	CONSTRAINT fk_roles_users
		FOREIGN KEY (role_id) REFERENCES `role` (id)
);