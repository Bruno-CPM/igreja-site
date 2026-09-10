const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Cadastro de pedido de lembrete mensal de dizimo/contribuicao.
// O disparo em si (e-mail/WhatsApp) ainda precisa ser conectado a um
// provedor (ex: Nodemailer ou API do WhatsApp Business) rodando num
// job mensal que leia esta tabela.
const LembreteDizimo = sequelize.define(
  'LembreteDizimo',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
    // Canal preferido: "email" ou "whatsapp"
    canal: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true, isIn: [['email', 'whatsapp']] } },
    // Endereco de e-mail ou numero de WhatsApp, conforme o canal
    contato: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
    // Dia do mes preferido para o lembrete (1-28)
    diaPreferido: { type: DataTypes.INTEGER, allowNull: true, validate: { min: 1, max: 28 } },
    criadoEm: { type: DataTypes.DATE, allowNull: true },
  },
  {
    tableName: 'lembretes_dizimo',
    timestamps: false,
    hooks: {
      beforeCreate: (lembrete) => {
        lembrete.criadoEm = new Date();
      },
    },
  }
);

module.exports = LembreteDizimo;
