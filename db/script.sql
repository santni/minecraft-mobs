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

CREATE TABLE batalhas(
    id SERIAL PRIMARY KEY,
    mob1_id INT NOT NULL,
    mob2_id INT NOT NULL,
    vencedor INT,
    FOREIGN KEY (mob1_id) REFERENCES mobs(id),
    FOREIGN KEY (mob2_id) REFERENCES mobs(id)
);

--inserts

-- INSERT INTO mobs (nome, habilidade, nivel, hp) VALUES ('Creeper', 'Explosão', 10, 100);
-- INSERT INTO mobs (nome, habilidade, nivel, hp) VALUES ('Witch', 'Poções mágicas', 11, 110);
-- INSERT INTO mobs (nome, habilidade, nivel, hp) VALUES ('Blaze', 'Disparo de fogo', 13, 130);
-- INSERT INTO mobs (nome, habilidade, nivel, hp) VALUES ('Ghast', 'Bolas de fogo', 14, 140);
-- INSERT INTO mobs (nome, habilidade, nivel, hp) VALUES ('Slime', 'Dividir-se', 6, 60);
-- INSERT INTO mobs (nome, habilidade, nivel, hp) VALUES ('Ender Dragon', 'Ataque de fogo', 50, 1000);
-- INSERT INTO mobs (nome, habilidade, nivel, hp) VALUES ('Wither', 'Explosão de caveira', 45, 900);
-- INSERT INTO mobs (nome, habilidade, nivel, hp) VALUES ('Endermite', 'Ataque de teletransporte', 8, 80);
-- INSERT INTO mobs (nome, habilidade, nivel, hp) VALUES ('Iron Golem', 'Ataque com pancadas', 20, 800);
-- INSERT INTO mobs (nome, habilidade, nivel, hp) VALUES ('Guardian', 'Raio laser', 15, 150);
-- INSERT INTO mobs (nome, habilidade, nivel, hp) VALUES ('Elder Guardian', 'Raio laser', 30, 300);
-- INSERT INTO mobs (nome, habilidade, nivel, hp) VALUES ('Vindicator', 'Ataque com machado', 18, 180);
-- INSERT INTO mobs (nome, habilidade, nivel, hp) VALUES ('Pillager', 'Ataque com besta', 16, 160);
-- INSERT INTO mobs (nome, habilidade, nivel, hp) VALUES ('Evoker', 'Invocação de monstros', 25, 250);
-- INSERT INTO mobs (nome, habilidade, nivel, hp) VALUES ('Phantom', 'Ataque aéreo', 22, 220);