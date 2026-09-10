const { LembreteDizimo } = require('../models');

// Cadastra o pedido de lembrete mensal de dizimo/contribuicao.
async function cadastrarLembrete(req, res) {
  const { nome, canal, contato, diaPreferido } = req.body;
  const lembrete = await LembreteDizimo.create({ nome, canal, contato, diaPreferido });
  return res.status(201).json(lembrete);
}

module.exports = { cadastrarLembrete };
