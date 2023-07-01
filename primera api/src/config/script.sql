DROP TABLE usuario;
DROP TABLE mascota;



CREATE TABLE usuario (
  id_usuario INTEGER 
    NOT NULL
    PRIMARY KEY 
    AUTO_INCREMENT
  ,user VARCHAR(20)
    NOT NULL
  ,password VARCHAR(64) 
    NOT NULL
  ,activo INTEGER
    NOT NULL
  );


CREATE TABLE mascota (
  id_mascota INTEGER
    NOT NULL
    PRIMARY KEY
    AUTO_INCREMENT
  ,nombre VARCHAR(30)
    NOT NULL
  ,tipo_mascota VARCHAR(30)
    NOT NULL
  ,raza VARCHAR(50)
    NOT NULL
  ,fecha_nacimiento DATE
    NOT NULL
  ,img VARCHAR(500)
    NOT NULL
);