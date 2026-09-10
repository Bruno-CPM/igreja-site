const sequelize = require('../config/database');
const Evento = require('./Evento');
const Servico = require('./Servico');
const Pregador = require('./Pregador');
const Pregacao = require('./Pregacao');
const Mensagem = require('./Mensagem');
const LembreteDizimo = require('./LembreteDizimo');

// Equivalente ao @ManyToOne de Pregacao -> Pregador
Pregador.hasMany(Pregacao, { foreignKey: 'pregadorId', as: 'pregacoes' });
Pregacao.belongsTo(Pregador, { foreignKey: 'pregadorId', as: 'pregador' });

module.exports = {
  sequelize,
  Evento,
  Servico,
  Pregador,
  Pregacao,
  Mensagem,
  LembreteDizimo,
};
