const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 4000;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'minecraft',
    password: 'ds564',
    port: 7007,
});

app.use(express.json());

app.get('/', (req, res) => {
    res.send('A rota está funcionado!')
});

// - Rota para obter um mob:

app.get('/mobs', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM mobs');
        res.json({
            total: result.rowCount,
            mobs: result.rows,
        });
    } catch (error) {
        console.error('Erro ao obter todos os mobs', error);
        res.status(500).send('Erro ao obter todos os mobs');
    }
});


// - Rota para obter um mob por ID:

app.get('/mobs/:filter', async (req, res) => {
    try {
        const { filter } = req.params;

        if (isNaN(req.params.filter)) {
            const result = await pool.query('SELECT * FROM mobs WHERE nome LIKE $1', [`%${filter}%`]);
            res.status(200).json(result.rows[0]);
        } else {
            const result = await pool.query('SELECT * FROM mobs WHERE  = $1', [filter]);
            res.status(200).json(result.rows[0]);
        }
    } catch (error) {
        console.error('Erro ao obter mob pelo nome', error);
        res.status(500).send('Erro ao obter mob pelo nome');
    }
})


// - Rota para criar/adicionar um novo mob:

app.post('/mobs', async (req, res) => {
    try {
        const { nome, habilidade, nivel, hp } = req.body;

        await pool.query('INSERT INTO mobs (nome, habilidade, nivel, hp) VALUES ($1, $2, $3, $4)', [nome, habilidade, nivel, hp]);
        res.status(201).send({ mensagem: 'mob criado com sucesso!' });
    } catch (error) {
        console.error('Erro ao criar mob', error);
        res.status(500).json({ message: 'Erro ao criar mob' });
    }
});



app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});