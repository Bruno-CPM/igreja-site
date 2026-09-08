const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Equivalente a Pregacao.java
const Pregacao = sequelize.define(
  'Pregacao',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    titulo: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
    data: { type: DataTypes.DATEONLY, allowNull: false },
    // ex: Fe, Familia, Esperanca
    tema: { type: DataTypes.STRING, allowNull: true },
    // link do video (Youtube, etc)
    videoUrl: { type: DataTypes.STRING, allowNull: true },
    descricao: { type: DataTypes.STRING(3000), allowNull: true },
    pregadorId: { type: DataTypes.INTEGER, allowNull: true, field: 'pregador_id' },
  },
  {
    tableName: 'pregacoes',
    timestamps: false,
  }
);

module.exports = Pregacao;
