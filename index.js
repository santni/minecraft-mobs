const express = require('express');
const { Pool } = require('pg');

const app = express();
const port= 7007;

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

app.get('/mobs', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM mobs');
        res.json({
            total: result.rowCount,
            heroes: result.rows,
        });
    } catch (error) {
       console.error('Erro ao obter todos os mobs', error); 
       res.status(500).send('Erro ao obter todos os mobs');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando corretamente na porta ${port}`);
  });