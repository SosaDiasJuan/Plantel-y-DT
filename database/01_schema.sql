CREATE DATABASE IF NOT EXISTS plantel_y_dt
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE plantel_y_dt;

-- =========================================================
-- ROLES
-- =========================================================

CREATE TABLE roles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO roles (nombre) VALUES
('ADMIN'),
('DIRECTOR_TECNICO'),
('JUGADOR');


-- =========================================================
-- CLUBES
-- =========================================================

CREATE TABLE clubes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    nombre_corto VARCHAR(50),
    email VARCHAR(150),
    telefono VARCHAR(30),
    direccion VARCHAR(255),
    ciudad VARCHAR(100),
    pais VARCHAR(100) DEFAULT 'Uruguay',
    logo_url VARCHAR(500),
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- =========================================================
-- USUARIOS
-- =========================================================

CREATE TABLE usuarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,

    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,

    activo BOOLEAN NOT NULL DEFAULT TRUE,

    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);


-- =========================================================
-- RELACION USUARIO - CLUB
-- =========================================================

CREATE TABLE club_usuarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    club_id BIGINT NOT NULL,
    usuario_id BIGINT NOT NULL,
    rol_id BIGINT NOT NULL,

    activo BOOLEAN NOT NULL DEFAULT TRUE,

    fecha_alta TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_club_usuario_club
        FOREIGN KEY (club_id)
        REFERENCES clubes(id),

    CONSTRAINT fk_club_usuario_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id),

    CONSTRAINT fk_club_usuario_rol
        FOREIGN KEY (rol_id)
        REFERENCES roles(id),

    CONSTRAINT uk_club_usuario_rol
        UNIQUE (club_id, usuario_id, rol_id)
);


-- =========================================================
-- CATEGORIAS
-- Ejemplo: Primera, Sub-19, Sub-17, Sub-15
-- =========================================================

CREATE TABLE categorias (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    club_id BIGINT NOT NULL,

    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255),

    activo BOOLEAN NOT NULL DEFAULT TRUE,

    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_categoria_club
        FOREIGN KEY (club_id)
        REFERENCES clubes(id),

    CONSTRAINT uk_categoria_club_nombre
        UNIQUE (club_id, nombre)
);


-- =========================================================
-- EQUIPOS
-- Permite que un club tenga Sub-15 A, Sub-15 B, etc.
-- =========================================================

CREATE TABLE equipos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    club_id BIGINT NOT NULL,
    categoria_id BIGINT NOT NULL,

    nombre VARCHAR(100) NOT NULL,

    temporada VARCHAR(20),

    activo BOOLEAN NOT NULL DEFAULT TRUE,

    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_equipo_club
        FOREIGN KEY (club_id)
        REFERENCES clubes(id),

    CONSTRAINT fk_equipo_categoria
        FOREIGN KEY (categoria_id)
        REFERENCES categorias(id)
);


-- =========================================================
-- INTEGRANTES DEL EQUIPO
-- Jugadores y cuerpo técnico
-- =========================================================

CREATE TABLE equipo_usuarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    equipo_id BIGINT NOT NULL,
    usuario_id BIGINT NOT NULL,

    posicion VARCHAR(50),

    numero_camiseta INT,

    fecha_ingreso DATE,

    activo BOOLEAN NOT NULL DEFAULT TRUE,

    CONSTRAINT fk_equipo_usuario_equipo
        FOREIGN KEY (equipo_id)
        REFERENCES equipos(id),

    CONSTRAINT fk_equipo_usuario_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id),

    CONSTRAINT uk_equipo_usuario
        UNIQUE (equipo_id, usuario_id)
);


-- =========================================================
-- ENTRENAMIENTOS
-- =========================================================

CREATE TABLE entrenamientos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    equipo_id BIGINT NOT NULL,
    creado_por BIGINT NOT NULL,

    titulo VARCHAR(150) NOT NULL,
    objetivo TEXT,
    descripcion TEXT,

    fecha DATE NOT NULL,
    hora_inicio TIME,
    duracion_minutos INT,

    estado VARCHAR(30) NOT NULL DEFAULT 'PLANIFICADO',

    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_entrenamiento_equipo
        FOREIGN KEY (equipo_id)
        REFERENCES equipos(id),

    CONSTRAINT fk_entrenamiento_creador
        FOREIGN KEY (creado_por)
        REFERENCES usuarios(id)
);


-- =========================================================
-- EJERCICIOS
-- Biblioteca reutilizable
-- =========================================================

CREATE TABLE ejercicios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    club_id BIGINT,

    nombre VARCHAR(150) NOT NULL,

    descripcion TEXT,

    objetivo TEXT,

    duracion_minutos INT,

    imagen_url VARCHAR(500),
    video_url VARCHAR(500),

    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_ejercicio_club
        FOREIGN KEY (club_id)
        REFERENCES clubes(id)
);


-- =========================================================
-- EJERCICIOS DENTRO DE UN ENTRENAMIENTO
-- =========================================================

CREATE TABLE entrenamiento_ejercicios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    entrenamiento_id BIGINT NOT NULL,
    ejercicio_id BIGINT NOT NULL,

    orden INT NOT NULL,

    series INT,
    repeticiones INT,

    duracion_minutos INT,

    indicaciones TEXT,

    CONSTRAINT fk_entrenamiento_ejercicio_entrenamiento
        FOREIGN KEY (entrenamiento_id)
        REFERENCES entrenamientos(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_entrenamiento_ejercicio_ejercicio
        FOREIGN KEY (ejercicio_id)
        REFERENCES ejercicios(id)
);


-- =========================================================
-- PARTIDOS
-- =========================================================

CREATE TABLE partidos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    equipo_id BIGINT NOT NULL,

    rival VARCHAR(150) NOT NULL,

    fecha DATETIME NOT NULL,

    local_visitante VARCHAR(20),

    goles_favor INT DEFAULT 0,
    goles_contra INT DEFAULT 0,

    competencia VARCHAR(150),

    observaciones TEXT,

    analisis TEXT,

    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_partido_equipo
        FOREIGN KEY (equipo_id)
        REFERENCES equipos(id)
);


-- =========================================================
-- EVENTOS DEL PARTIDO
-- =========================================================

CREATE TABLE partido_eventos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    partido_id BIGINT NOT NULL,
    usuario_id BIGINT,

    minuto INT,

    tipo VARCHAR(50) NOT NULL,

    descripcion TEXT,

    CONSTRAINT fk_evento_partido
        FOREIGN KEY (partido_id)
        REFERENCES partidos(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_evento_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id)
);


-- =========================================================
-- ASISTENCIA A ENTRENAMIENTOS
-- =========================================================

CREATE TABLE asistencias (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    entrenamiento_id BIGINT NOT NULL,
    usuario_id BIGINT NOT NULL,

    estado VARCHAR(30) NOT NULL,

    observaciones VARCHAR(255),

    fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_asistencia_entrenamiento
        FOREIGN KEY (entrenamiento_id)
        REFERENCES entrenamientos(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_asistencia_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id),

    CONSTRAINT uk_asistencia
        UNIQUE (entrenamiento_id, usuario_id)
);
