# Gerenciamento de Mobs e Batalhas

![Banner](/assets/images/minecraft.gif)

---

## Introdução

O Projeto de Gerenciamento de Mobs é uma aplicação de backend desenvolvida para oferecer funcionalidades de CRUD (Create, Read, Update, Delete) relacionadas a mobs do Minecraft. Ele permite a criação, atualização, exclusão e recuperação de informações sobre mobs, bem como funcionalidades adicionais, como batalhas entre mobs e registro de histórico de batalhas.

---

## Funcionalidades

- **CRUD de Mobs:** Criação, leitura, atualização e exclusão de mobs.
- **Batalhas entre Mobs:** Realização de batalhas entre mobs.
- **Registro de Histórico:** Registro e consulta de histórico de batalhas.

---

## Tecnologias Utilizadas

- **Node.js**
- **Express.js**
- **PostgreSQL**

---

## Como Usar

1. Clone o repositório para o seu ambiente local.
2. Instale as dependências do projeto usando `npm install`.
3. Configure o banco de dados PostgreSQL com o nome `minecraft_db` e execute o script `script.sql` para criar as tabelas necessárias.
4. Abra o arquivo `index.js` e ajuste as configurações do banco de dados conforme necessário (usuário, senha, host, porta).
5. Inicie o servidor executando `npm run dev`.
6. Acesse as diferentes rotas disponíveis conforme a documentação fornecida.

---


## Documentação e Teste de Rotas

**Testando as Rotas no Insomnia:**

Para testar cada rota individualmente, siga estas instruções:

1. **Rota para obter todos os mobs**

- Método: GET
- URL: `http://localhost:4000/mobs`

2. **Rota para adicionar um novo mob**

- Método: POST
- URL: `http://localhost:4000/mobs`
- Corpo da Requisição (JSON):
  ```json
  {
      "nome": "Nome do Mob",
      "habilidade": "Habilidade do Mob",
      "nivel": 1,
      "hp": 100
  }

3. **Rota para atualizar um mob**

   - Método: PUT
   - URL: `http://localhost:4000/mobs/{id}`
     - Substitua `{id}` pelo ID do mob que deseja atualizar.
   - Corpo da Requisição (JSON):
     ```json
     {
         "nome": "Novo Nome do Mob",
         "habilidade": "Nova Habilidade do Mob",
         "nivel": 2,
         "hp": 150
     }
     ```

4. **Rota para deletar um mob**

   - Método: DELETE
   - URL: `http://localhost:4000/mobs/{id}`
     - Substitua `{id}` pelo ID do mob que deseja deletar.

5. **Rota para obter um mob específico**

   - Método: GET
   - URL: `http://localhost:4000/mobs/{id}`
     - Substitua `{id}` pelo ID do mob que deseja recuperar.

6. **Rota para realizar uma batalha entre dois mobs**

   - Método: GET
   - URL: `http://localhost:4000/batalhas/{mob1_id}/{mob2_id}`
     - Substitua `{mob1_id}` e `{mob2_id}` pelos IDs dos mobs que deseja colocar para batalhar.

7. **Rota para obter o histórico de batalhas**

   - Método: GET
   - URL: `http://localhost:4000/batalhas`

8. **Rota para obter o histórico de batalhas com os dados dos mobs**

   - Método: GET
   - URL: `http://localhost:4000/batalhas/mobs`

**Aviso Importante:**

Este projeto destina-se exclusivamente a fins educacionais. Os dados de acesso ao banco de dados estão expostos neste projeto, pois é destinado a fins educacionais como um projeto. Certifique-se de não utilizar informações sensíveis neste contexto.
