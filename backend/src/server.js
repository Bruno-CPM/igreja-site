require('dotenv').config();

const app = require('./app');
const { sequelize } = require('./models');
const seed = require('./seeders/seed');

const PORT = process.env.PORT || 8080;

async function start() {
  // Equivalente a spring.jpa.hibernate.ddl-auto=update: cria/atualiza as
  // tabelas automaticamente com base nos models
  await sequelize.sync({ alter: true });

  await seed();

  app.listen(PORT, () => {
    console.log(`igreja-site-api rodando na porta ${PORT}`);
  });
}

start().catch((err) => {
  console.error('Falha ao iniciar a aplicação:', err);
  process.exit(1);
});
