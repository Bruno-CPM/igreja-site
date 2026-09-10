require('express-async-errors'); // permite que erros em controllers async caiam no error handler
const express = require('express');
const buildCorsMiddleware = require('./config/cors');

const eventosRouter = require('./routes/eventos');
const servicosRouter = require('./routes/servicos');
const pregadoresRouter = require('./routes/pregadores');
const pregacoesRouter = require('./routes/pregacoes');
const contatoRouter = require('./routes/contato');
const dizimoRouter = require('./routes/dizimo');

const app = express();

app.use(express.json());
app.use('/api', buildCorsMiddleware());

app.use('/api/eventos', eventosRouter);
app.use('/api/servicos', servicosRouter);
app.use('/api/pregadores', pregadoresRouter);
app.use('/api/pregacoes', pregacoesRouter);
app.use('/api/contato', contatoRouter);
app.use('/api/dizimo', dizimoRouter);

// Tratador de erros central (evita que a API derrube o processo,
// equivalente ao comportamento padrao do Spring Boot em erros nao tratados)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ erro: 'Erro interno no servidor' });
});

module.exports = app;
