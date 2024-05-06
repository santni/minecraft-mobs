-- COMANDO NO SQL

CREATE DATABASE minecraft;

\c minecraft;

CREATE TABLE mobs (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    habilidade VARCHAR(100) NOT NULL,
    nivel INTEGER NOT NULL,
    hp INTEGER NOT NULL
);

CREATE TABLE batalhas (
    id SERIAL PRIMARY KEY,
    material VARCHAR(100) NOT NULL,
    comprimento VARCHAR(20) NOT NULL,
    nucleo VARCHAR(100) NOT NULL,
    data_fabricacao DATE NOT NULL
);

--insert de um mob aleatório

--INSERT INTO mobs (nome, habilidade, nivel, hp) VALUES ('Creeper', 'Explosão', 10, 100);

