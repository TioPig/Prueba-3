DROP TABLE usuario;
DROP TABLE mascota;



CREATE TABLE usuario (
  id_usuario INTEGER 
    NOT NULL
    PRIMARY KEY
    AUTO_INCREMENT
  ,nombre VARCHAR(40)
    NOT NULL
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
    DEFAULT '00-00-0000'
  ,img VARCHAR(500)
    NOT NULL
  ,id_usuario INTEGER
    NOT NULL
);

INSERT INTO `mascota` (`id_mascota`, `nombre`, `tipo_mascota`, `raza`, `fecha_nacimiento`, `img`, `id_usuario`) VALUES
(1, 'Italo', 'perro', 'Husky', '10-05-2010', 'www.niples.com', 1);

INSERT INTO `usuario` (`id_usuario`, `nombre`, `user`, `password`, `activo`) VALUES
(1, 'Italo', 'TioPig', '$2b$10$0sj78Oruw7T.5LQEgsYs7.XawsCtF3Wd3fpcz4lJedD1YzGuRk8SW', 1);

/** Contraseña: Contrasena123

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7ImlkIjoxLCJub21icmUiOiJJdGFsbyIsImFjdGl2byI6MX0sImlhdCI6MTY4ODIxNzc5Nn0.rlxZbhfQ7qbWEUAV2U1PSdANDKeo6txjdebeA3smouQ

TOKEN

**/