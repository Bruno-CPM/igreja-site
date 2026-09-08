const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Equivalente a Mensagem.java (formulario de contato)
const Mensagem = sequelize.define(
  'Mensagem',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
    email: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true, isEmail: true } },
    telefone: { type: DataTypes.STRING, allowNull: true },
    texto: { type: DataTypes.STRING(4000), allowNull: false, validate: { notEmpty: true } },
    enviadoEm: { type: DataTypes.DATE, allowNull: true },
  },
  {
    tableName: 'mensagens',
    timestamps: false,
    hooks: {
      // Equivalente ao @PrePersist do Java: seta a data de envio automaticamente
      beforeCreate: (mensagem) => {
        mensagem.enviadoEm = new Date();
      },
    },
  }
);

module.exports = Mensagem;
