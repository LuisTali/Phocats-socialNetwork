CREATE DATABASE Phocats;
USE Phocats;

CREATE TABLE Users(
	id int IDENTITY(1,1) CONSTRAINT pkUsers PRIMARY KEY,
	email varchar(80) NOT NULL CONSTRAINT uqUsers1 UNIQUE,
	username  varchar(50) NOT NULL CONSTRAINT uqUsers2 UNIQUE,
	[password] varchar(50) CONSTRAINT ckUsers CHECK([password] LIKE '[a-z,0-9][a-z,0-9][a-z,0-9][a-z,0-9][a-z,0-9][a-z,0-9][a-z,0-9][a-z,0-9]%'),
	completeName varchar(100) NOT NULL,
	madeIn datetime,
	userDescription varchar(200),
	birthDate date,
	profileImg varchar(1000),
	validated bit default 0 //Added recently
);

CREATE TABLE Followers(
	idUser1 int NOT NULL CONSTRAINT pfkFriends1 FOREIGN KEY REFERENCES Users(id), /*idFollower*/
	idUser2 int NOT NULL CONSTRAINT pfkFriends2 FOREIGN KEY REFERENCES Users(id), /*idFollowing*/
	followSince datetime NOT NULL,
	notificated bit null DEFAULT 0 /*Handle notifications*/
);

CREATE TABLE Publications(
	id int IDENTITY(1,1) CONSTRAINT pkPublications PRIMARY KEY,
	idUser int CONSTRAINT fkPublications1 FOREIGN KEY REFERENCES Users(id),
	textDescription varchar(300),
	imgName varchar(1000),
	madeIn datetime,
);

CREATE TABLE Tags(
	id int IDENTITY(1,1) CONSTRAINT pkTags PRIMARY KEY,
	nameTag varchar(50) NOT NULL CONSTRAINT uqTags UNIQUE
);

CREATE TABLE Publications_X_Tag(
	idPublication int NOT NULL CONSTRAINT pfkPxT1 FOREIGN KEY REFERENCES Publications(id),
	idTag int NOT NULL CONSTRAINT pfkPxT2 FOREIGN KEY REFERENCES Tags(id)
);

CREATE TABLE ValidateToken(
	idUser int NOT NULL CONSTRAINT fkValidateToken FOREIGN KEY REFERENCES Users(id),
	token varchar(10) NOT NULL CONSTRAINT uqValidateToken UNIQUE,
	madeIn datetime NOT NULL 
);

//Triggers
//Al editar textdescription de publication, eliminar su asociacion con los tags anteriores
CREATE TRIGGER updateTagsPublication ON Publications AFTER UPDATE
AS
if UPDATE(textDescription)
BEGIN
DELETE Publications_X_Tag FROM Publications_X_Tag INNER JOIN INSERTED ON INSERTED.id = Publications_X_Tag.idPublication;
END

//Al generar nuevo token de autentificacion de usuario, se ejecuta el procedimiento almacenado eliminando el token anterior asociado a ese usuario y generando uno nuevo;
CREATE PROCEDURE insertToken @idUser int, @token varchar(10)
AS 
DELETE FROM ValidateToken WHERE idUser = @idUser;
INSERT INTO ValidateToken VALUES (@idUser,@token,GETDATE());