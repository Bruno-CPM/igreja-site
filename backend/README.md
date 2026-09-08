# igreja-site-api (Node.js)

API REST do site institucional da igreja, desenvolvida em Node.js. O frontend
React pode consumir esta API diretamente, sem adaptações.

## Stack

- Node.js
- Express
- Sequelize
- SQLite
- express-validator
- CORS

## Como rodar

```bash
cd backend-node
npm install
cp .env.example .env   # ajuste PORT e FRONTEND_URL se precisar
npm start               # ou: npm run dev (reinicia sozinho a cada alteração)
```

O servidor sobe em `http://localhost:8080`. O banco SQLite é criado
automaticamente em `data/igreja.sqlite` na primeira execução, e os dados de
exemplo são inseridos pelo seeder da aplicação.

## Endpoints

- `GET/POST/PUT/DELETE /api/eventos` (filtro `?realizado=true|false`)
- `GET/POST/DELETE /api/servicos`
- `GET/POST/PUT/DELETE /api/pregadores`
- `GET/POST/DELETE /api/pregacoes` (filtro `?pregadorId=`)
- `POST /api/contato`

## Banco de dados

O banco SQLite pode ser inspecionado com qualquer cliente compatível, como a
extensão do VS Code, DBeaver ou `sqlite3 data/igreja.sqlite`. As tabelas são
criadas e atualizadas automaticamente a partir dos models.

## Próximos passos sugeridos

- Trocar SQLite por Postgres/MySQL em produção (Sequelize suporta os dois,
  basta trocar o `dialect` em `src/config/database.js`).
- Conectar `contatoController.js` a um serviço de e-mail, como o Nodemailer.
- Adicionar autenticação nas rotas de escrita (POST/PUT/DELETE), hoje
  abertas para facilitar a integração com o frontend.
