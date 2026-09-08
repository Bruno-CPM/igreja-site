const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Equivalente a Servico.java
const Servico = sequelize.define(
  'Servico',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    // ex: Culto de Celebracao, Escola Biblica, Ministerio Infantil
    nome: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
    descricao: { type: DataTypes.STRING(2000), allowNull: true },
    // ex: Domingos as 18h
    horario: { type: DataTypes.STRING, allowNull: true },
    // nome do icone usado no frontend
    icone: { type: DataTypes.STRING, allowNull: true },
  },
  {
    tableName: 'servicos',
    timestamps: false,
  }
);

module.exports = Servico;
