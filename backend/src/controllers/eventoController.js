const { Evento } = require('../models');

// GET /api/eventos?realizado=true  -> eventos que a igreja ja realizou
// GET /api/eventos?realizado=false -> proximos eventos
// GET /api/eventos                 -> todos
async function listar(req, res) {
  const { realizado } = req.query;

  if (realizado === undefined) {
    const eventos = await Evento.findAll();
    return res.json(eventos);
  }

  const isRealizado = realizado === 'true';
  const eventos = await Evento.findAll({
    where: { realizado: isRealizado },
    order: [['data', isRealizado ? 'DESC' : 'ASC']],
  });
  return res.json(eventos);
}

async function buscar(req, res) {
  const evento = await Evento.findByPk(req.params.id);
  if (!evento) return res.status(404).end();
  return res.json(evento);
}

async function criar(req, res) {
  const evento = await Evento.create(req.body);
  return res.status(201).json(evento);
}

async function atualizar(req, res) {
  const evento = await Evento.findByPk(req.params.id);
  if (!evento) return res.status(404).end();

  const { titulo, data, horario, local, descricao, imagemUrl, realizado } = req.body;
  await evento.update({ titulo, data, horario, local, descricao, imagemUrl, realizado });
  return res.json(evento);
}

async function excluir(req, res) {
  const evento = await Evento.findByPk(req.params.id);
  if (!evento) return res.status(404).end();
  await evento.destroy();
  return res.status(204).end();
}

module.exports = { listar, buscar, criar, atualizar, excluir };
