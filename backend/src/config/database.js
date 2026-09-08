const path = require('path');
const { Sequelize } = require('sequelize');

// Banco em arquivo, equivalente ao H2 em arquivo do backend Java
// (lá era ./data/igreja.mv.db, aqui fica ./data/igreja.sqlite)
const storagePath = path.join(__dirname, '..', '..', 'data', 'igreja.sqlite');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: storagePath,
  logging: false, // equivalente a spring.jpa.show-sql=false
});

module.exports = sequelize;
