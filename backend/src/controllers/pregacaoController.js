const { Pregacao, Pregador } = require('../models');

// Ao trazer o pregador aninhado, escondemos a biografia
// (equivalente a @JsonIgnoreProperties({"biografia"}) no Java)
const includePregador = {
  model: Pregador,
  as: 'pregador',
  attributes: { exclude: ['biografia'] },
};

async function listar(req, res) {
  const { pregadorId } = req.query;

  const where = pregadorId ? { pregadorId } : undefined;
  const pregacoes = await Pregacao.findAll({
    where,
    include: [includePregador],
    order: [['data', 'DESC']],
  });
  return res.json(pregacoes);
}

async function buscar(req, res) {
  const pregacao = await Pregacao.findByPk(req.params.id, { include: [includePregador] });
  if (!pregacao) return res.status(404).end();
  return res.json(pregacao);
}

async function criar(req, res) {
  const { titulo, data, tema, videoUrl, descricao, pregador } = req.body;

  let pregadorId = null;
  if (pregador && pregador.id) {
    const pregadorExistente = await Pregador.findByPk(pregador.id);
    if (!pregadorExistente) {
      return res.status(400).json('Pregador informado nao existe');
    }
    pregadorId = pregadorExistente.id;
  }

  const nova = await Pregacao.create({ titulo, data, tema, videoUrl, descricao, pregadorId });
  const salva = await Pregacao.findByPk(nova.id, { include: [includePregador] });
  return res.status(201).json(salva);
}

async function excluir(req, res) {
  const pregacao = await Pregacao.findByPk(req.params.id);
  if (!pregacao) return res.status(404).end();
  await pregacao.destroy();
  return res.status(204).end();
}

module.exports = { listar, buscar, criar, excluir };
