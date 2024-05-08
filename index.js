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

// ✅ Rota para obter todos os mobs:

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

// ✅ Rota para obter o histórico de batalhas:

app.get('/batalhas', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM batalhas');
        res.json({
            total: result.rowCount,
            batalhas: result.rows,
        });
    } catch (error) {
        console.error('Erro ao obter todas as batalhas', error);
        res.status(500).send('Erro ao obter todas as batalhas');
    }
});

// - Rota para realizar uma batalha entre os mobs:

app.get('/batalhas/:mob1_id/:mob2_id', async (req, res) => {
    try {
        const { mob1_id, mob2_id } = req.params;

        // Obter dados dos mobs do minecraft
        const result1 = await pool.query('SELECT * FROM mobs WHERE id = $1', [mob1_id]);
        const result2 = await pool.query('SELECT * FROM mobs WHERE id = $1', [mob2_id]);

        const mob1 = result1.rows[0];
        const mob2 = result2.rows[0];

        let vencedor = -1;

         // O mob com o maior nível ganha a batalha

        if (mob1.nivel > mob2.nivel) {
            vencedor = mob1.id;
        } else if (mob2.nivel > mob1.nivel) {
            vencedor = mob2.id;
        }

        // Dados da tabela de batalha
        const batalhaInsertQuery = 'INSERT INTO batalhas (mob1_id, mob2_id, vencedor) VALUES ($1, $2, $3) RETURNING id';
        const batalhaResult = await pool.query(batalhaInsertQuery, [mob1_id, mob2_id, vencedor]);

        let vencedorInfo;
        if (vencedor != -1) {
            const vencedorResult = await pool.query('SELECT * FROM mobs WHERE id = $1', [vencedor]);
            vencedorInfo = vencedorResult.rows[0];
        }

        res.json({ vencedor: vencedor == -1 ? 'Empate' : vencedor, batalha_id: batalhaResult.rows[0].id });
    } catch (error) {
        console.error('Erro ao batalhar', error);
        res.status(500).json({ message: 'Erro ao batalhar' });
    }
});

// ✅ Rota para obter mob pelo nome (filtro de pesquisa):

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


// ✅ Rota para criar/adicionar um novo mob:

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

// ✅ Rota para atualizar um mob existente:
app.put('/mobs/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, habilidade, nivel, hp } = req.body;

        await pool.query('UPDATE mobs SET nome = $1, habilidade = $2, nivel = $3, hp = $4 WHERE id = $5', [nome, habilidade, nivel, hp, id]);
        res.status(200).send({ mensagem: 'Mob atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar mob', error);
        res.status(500).send('Erro ao atualizar mob');
    }
});

// ✅ Rota para deletar um mob específico:

app.delete('/mobs/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM mobs WHERE id = $1', [id]);
        res.status(200).send({ mensagem: 'Mob deletado com sucesso!!' });
    } catch (error) {
        console.error('Erro ao deletar mob', error);
        res.status(500).send('Erro ao deletar mob');
    }
});


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port} ✅`);
});