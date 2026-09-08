const { Pregador, Pregacao, Evento, Servico } = require('../models');

function diasAPartirDeHoje(dias) {
  const d = new Date();
  d.setDate(d.getDate() + dias);
  return d.toISOString().slice(0, 10);
}

function mesesAPartirDeHoje(meses) {
  const d = new Date();
  d.setMonth(d.getMonth() + meses);
  return d.toISOString().slice(0, 10);
}

// Popula o banco com dados de exemplo na primeira execucao,
// apenas para o site nao nascer vazio. Substitua pelos
// conteudos reais (textos, imagens, videos) quando estiverem prontos.
// Equivalente a DataSeeder.java
async function seed() {
  const totalPregadores = await Pregador.count();
  if (totalPregadores === 0) {
    const p1 = await Pregador.create({
      nome: 'Pastor João Silva',
      cargo: 'Pastor Titular',
      biografia: 'Texto de biografia a ser fornecido.',
      fotoUrl: null,
    });
    const p2 = await Pregador.create({
      nome: 'Pastora Maria Souza',
      cargo: 'Pastora Auxiliar',
      biografia: 'Texto de biografia a ser fornecido.',
      fotoUrl: null,
    });

    await Pregacao.create({
      titulo: 'A Fé que Move Montanhas',
      data: diasAPartirDeHoje(-7),
      tema: 'Fé',
      descricao: 'Texto/descrição a ser fornecido.',
      pregadorId: p1.id,
    });

    await Pregacao.create({
      titulo: 'Restaurando a Família',
      data: diasAPartirDeHoje(-14),
      tema: 'Família',
      descricao: 'Texto/descrição a ser fornecido.',
      pregadorId: p2.id,
    });
  }

  const totalEventos = await Evento.count();
  if (totalEventos === 0) {
    await Evento.create({
      titulo: 'Culto de Celebração de Aniversário',
      data: diasAPartirDeHoje(20),
      horario: '19h00',
      local: 'Templo Sede',
      descricao: 'Descrição a ser fornecida.',
      realizado: false,
    });

    await Evento.create({
      titulo: 'Conferência de Louvor e Adoração',
      data: mesesAPartirDeHoje(-2),
      horario: '19h00',
      local: 'Templo Sede',
      descricao: 'Descrição a ser fornecida.',
      realizado: true,
    });
  }

  const totalServicos = await Servico.count();
  if (totalServicos === 0) {
    await Servico.create({
      nome: 'Culto de Celebração',
      descricao: 'Descrição a ser fornecida.',
      horario: 'Domingos às 18h',
      icone: 'cross',
    });

    await Servico.create({
      nome: 'Escola Bíblica Dominical',
      descricao: 'Descrição a ser fornecida.',
      horario: 'Domingos às 09h',
      icone: 'book',
    });

    await Servico.create({
      nome: 'Ministério Infantil',
      descricao: 'Descrição a ser fornecida.',
      horario: 'Domingos às 18h',
      icone: 'heart',
    });
  }
}

module.exports = seed;
