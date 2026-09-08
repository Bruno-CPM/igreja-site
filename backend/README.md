# igreja-site-api (Node.js)

Reescrita em Node.js do backend original em Java/Spring Boot. Mantém **exatamente
as mesmas rotas, nomes de campos e comportamento**, então o frontend React
não precisa de nenhuma alteração — basta apontar para esta API.

## Stack

| Java (original)          | Node.js (esta versão)      |
|---------------------------|-----------------------------|
| Spring Boot / Spring MVC  | Express                     |
| Spring Data JPA           | Sequelize                   |
| H2 (arquivo)              | SQLite (arquivo)            |
| Bean Validation (`@Valid`)| express-validator           |
| `CorsConfig.java`         | pacote `cors`                |
| `DataSeeder.java`         | `src/seeders/seed.js`       |

## Como rodar

```bash
cd backend-node
npm install
cp .env.example .env   # ajuste PORT e FRONTEND_URL se precisar
npm start               # ou: npm run dev (reinicia sozinho a cada alteração)
```

O servidor sobe em `http://localhost:8080` (mesma porta do backend Java).
O banco SQLite é criado automaticamente em `data/igreja.sqlite` na primeira
execução, e os dados de exemplo são inseridos igual ao `DataSeeder` original.

## Endpoints (idênticos ao backend Java)

- `GET/POST/PUT/DELETE /api/eventos` (filtro `?realizado=true|false`)
- `GET/POST/DELETE /api/servicos`
- `GET/POST/PUT/DELETE /api/pregadores`
- `GET/POST/DELETE /api/pregacoes` (filtro `?pregadorId=`)
- `POST /api/contato`

## O que muda em relação ao Java

- Console do H2 (`/h2-console`) não existe aqui. Para inspecionar o SQLite,
  use qualquer cliente de SQLite (ex: extensão do VS Code, DBeaver, ou
  `sqlite3 data/igreja.sqlite`).
- `spring.jpa.hibernate.ddl-auto=update` virou `sequelize.sync({ alter: true })`
  em `src/server.js` — cria/atualiza as tabelas automaticamente a partir dos
  models.

## Próximos passos sugeridos

- Trocar SQLite por Postgres/MySQL em produção (Sequelize suporta os dois,
  basta trocar o `dialect` em `src/config/database.js`).
- Conectar `contatoController.js` a um serviço de e-mail (ex: Nodemailer),
  como já estava planejado no comentário do `ContatoController.java` original.
- Adicionar autenticação nas rotas de escrita (POST/PUT/DELETE), hoje
  abertas igual ao backend Java original.
