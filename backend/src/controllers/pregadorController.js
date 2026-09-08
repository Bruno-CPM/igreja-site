const { Pregador } = require('../models');

async function listar(req, res) {
  const pregadores = await Pregador.findAll();
  return res.json(pregadores);
}

async function buscar(req, res) {
  const pregador = await Pregador.findByPk(req.params.id);
  if (!pregador) return res.status(404).end();
  return res.json(pregador);
}

async function criar(req, res) {
  const pregador = await Pregador.create(req.body);
  return res.status(201).json(pregador);
}

async function atualizar(req, res) {
  const pregador = await Pregador.findByPk(req.params.id);
  if (!pregador) return res.status(404).end();

  const { nome, cargo, biografia, fotoUrl } = req.body;
  await pregador.update({ nome, cargo, biografia, fotoUrl });
  return res.json(pregador);
}

async function excluir(req, res) {
  const pregador = await Pregador.findByPk(req.params.id);
  if (!pregador) return res.status(404).end();
  await pregador.destroy();
  return res.status(204).end();
}

module.exports = { listar, buscar, criar, atualizar, excluir };
