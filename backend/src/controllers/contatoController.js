const { Mensagem } = require('../models');

// Recebe as mensagens do formulario de "Contato" e salva no banco.
// Pode futuramente ser conectado a um servico de e-mail (ex: Nodemailer).
async function enviar(req, res) {
  const { nome, email, telefone, texto } = req.body;
  const mensagem = await Mensagem.create({ nome, email, telefone, texto });
  return res.status(201).json(mensagem);
}

module.exports = { enviar };
