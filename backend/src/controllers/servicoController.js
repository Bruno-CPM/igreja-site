const { Servico } = require('../models');

async function listar(req, res) {
  const servicos = await Servico.findAll();
  return res.json(servicos);
}

async function criar(req, res) {
  const servico = await Servico.create(req.body);
  return res.status(201).json(servico);
}

async function excluir(req, res) {
  const servico = await Servico.findByPk(req.params.id);
  if (!servico) return res.status(404).end();
  await servico.destroy();
  return res.status(204).end();
}

module.exports = { listar, criar, excluir };
