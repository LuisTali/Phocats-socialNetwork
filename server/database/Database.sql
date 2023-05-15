CREATE DATABASE Phocats;
USE Phocats;

CREATE TABLE Users(
	id int IDENTITY(1,1) CONSTRAINT pkUsers PRIMARY KEY,
	email varchar(80) NOT NULL CONSTRAINT uqUsers1 UNIQUE,
	username  varchar(50) NOT NULL CONSTRAINT uqUsers2 UNIQUE,
	[password] varchar(50) CONSTRAINT ckUsers CHECK([password] LIKE '[a-z,0-9][a-z,0-9][a-z,0-9][a-z,0-9][a-z,0-9][a-z,0-9][a-z,0-9][a-z,0-9]%'),
	completeName varchar(100) NOT NULL
);

CREATE TABLE Publications(
	id int IDENTITY(1,1) CONSTRAINT pkPublications PRIMARY KEY,
	idUser int CONSTRAINT fkPublications1 FOREIGN KEY REFERENCES Users(id),
	textDescription varchar(200),
	imgName varchar(100),
	madeIn datetime
);