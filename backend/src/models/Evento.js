const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Equivalente a Evento.java
const Evento = sequelize.define(
  'Evento',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    titulo: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
    data: { type: DataTypes.DATEONLY, allowNull: false },
    horario: { type: DataTypes.STRING, allowNull: true },
    local: { type: DataTypes.STRING, allowNull: true },
    descricao: { type: DataTypes.STRING(3000), allowNull: true },
    imagemUrl: { type: DataTypes.STRING, allowNull: true },
    // true = evento ja realizado (aparece em "Eventos que a igreja realizou")
    // false = evento futuro (aparece em "Proximos eventos")
    realizado: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  },
  {
    tableName: 'eventos',
    timestamps: false,
  }
);

module.exports = Evento;
