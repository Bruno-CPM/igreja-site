const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Equivalente a Pregador.java
const Pregador = sequelize.define(
  'Pregador',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
    // ex: Pastor titular, Pastor auxiliar, Ministro
    cargo: { type: DataTypes.STRING, allowNull: true },
    biografia: { type: DataTypes.STRING(2000), allowNull: true },
    // link da foto (a ser fornecida futuramente)
    fotoUrl: { type: DataTypes.STRING, allowNull: true },
  },
  {
    tableName: 'pregadores',
    timestamps: false,
  }
);

module.exports = Pregador;
