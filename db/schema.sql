DROP DATABASE IF EXISTS hamburger_db;

CREATE DATABASE hamburger_db;
USE hamburger_db;

CREATE TABLE burgers (
	id int NOT NULL auto_increment,
	name VARCHAR(255) NOT NULL,
	devour BOOLEAN DEFAULT false,
    PRIMARY KEY (id)
	
);