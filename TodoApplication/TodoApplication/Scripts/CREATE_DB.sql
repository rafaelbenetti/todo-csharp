CREATE TABLE Todo (
   Id INT NOT NULL,
   Title VARCHAR(255) NOT NULL
   PRIMARY KEY (Id)
)

INSERT INTO todo (Id, Title) 
	VALUES (1, 'Vaquinha para festa de aniver�rio');

INSERT INTO todo (Id, Title) 
	VALUES (2, 'Aprender Javascript');

INSERT INTO todo (Id, Title) 
	VALUES (3, 'Beber 2 litros de �gua por dia');

SELECT * FROM Todo;