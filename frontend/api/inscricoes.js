// Inscrições (confirmação de presença) nos eventos da igreja.
// Cada inscrição é guardada como um arquivo privado no Vercel Blob:
//   inscricoes/<eventoId>/<data>-<aleatorio>-p<pessoas>.json
// O número de pessoas fica no nome do arquivo, assim o total é calculado
// só listando os arquivos, sem precisar abrir um por um.
//
// GET  /api/inscricoes?evento=<id>              -> { total, inscricoes }
// POST /api/inscricoes  { evento, nome, telefone, pessoas } -> { ok, total }
// GET  /api/inscricoes?evento=<id>&lista=1  (cabeçalho x-senha) -> lista completa

const crypto = require('crypto');
const { put, list, get } = require('@vercel/blob');

const EVENTOS_ABERTOS = ['rota-dos-adoradores-2026'];
const MAX_PESSOAS = 10;

const prefixo = (evento) => `inscricoes/${evento}/`;

async function listarArquivos(evento) {
  const arquivos = [];
  let cursor;
  do {
    const pagina = await list({ prefix: prefixo(evento), limit: 1000, cursor });
    arquivos.push(...pagina.blobs);
    cursor = pagina.hasMore ? pagina.cursor : undefined;
  } while (cursor);
  return arquivos;
}

const pessoasDoArquivo = (pathname) => {
  const m = pathname.match(/-p(\d+)\.json$/);
  return m ? Number(m[1]) : 1;
};

async function resumo(evento) {
  const arquivos = await listarArquivos(evento);
  const total = arquivos.reduce((soma, a) => soma + pessoasDoArquivo(a.pathname), 0);
  return { arquivos, total, inscricoes: arquivos.length };
}

async function lerJson(pathname) {
  const r = await get(pathname, { access: 'private', useCache: false });
  if (!r || !r.stream) return null;
  const texto = await new Response(r.stream).text();
  return JSON.parse(texto);
}

function senhaConfere(recebida) {
  const certa = process.env.ADMIN_INSCRICOES_SENHA || '';
  if (!certa || typeof recebida !== 'string') return false;
  const a = Buffer.from(recebida);
  const b = Buffer.from(certa);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

async function lerCorpo(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') return JSON.parse(req.body || '{}');
  const partes = [];
  for await (const parte of req) partes.push(parte);
  return JSON.parse(Buffer.concat(partes).toString('utf8') || '{}');
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  try {
    if (req.method === 'GET') {
      const evento = String(req.query.evento || '');
      if (!EVENTOS_ABERTOS.includes(evento)) return res.status(404).json({ erro: 'Evento não encontrado.' });

      const { arquivos, total, inscricoes } = await resumo(evento);

      if (req.query.lista) {
        if (!senhaConfere(req.headers['x-senha'])) return res.status(401).json({ erro: 'Senha incorreta.' });
        const lista = (await Promise.all(arquivos.map((a) => lerJson(a.pathname).catch(() => null))))
          .filter(Boolean)
          .sort((x, y) => (x.criadoEm < y.criadoEm ? -1 : 1));
        return res.status(200).json({ total, inscricoes, lista });
      }

      return res.status(200).json({ total, inscricoes });
    }

    if (req.method === 'POST') {
      const dados = await lerCorpo(req);
      const evento = String(dados.evento || '');
      const nome = String(dados.nome || '').trim().slice(0, 100);
      const telefone = String(dados.telefone || '').replace(/[^\d+()\s-]/g, '').trim().slice(0, 25);
      const pessoas = Math.floor(Number(dados.pessoas));

      if (!EVENTOS_ABERTOS.includes(evento)) return res.status(404).json({ erro: 'Inscrições encerradas para este evento.' });
      if (nome.length < 2) return res.status(400).json({ erro: 'Informe seu nome.' });
      if (!Number.isFinite(pessoas) || pessoas < 1 || pessoas > MAX_PESSOAS) {
        return res.status(400).json({ erro: `Informe de 1 a ${MAX_PESSOAS} pessoas.` });
      }

      const id = `${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
      const registro = { id, evento, nome, telefone, pessoas, criadoEm: new Date().toISOString() };
      await put(`${prefixo(evento)}${id}-p${pessoas}.json`, JSON.stringify(registro), {
        access: 'private',
        contentType: 'application/json',
        addRandomSuffix: false,
      });

      const { total, inscricoes } = await resumo(evento);
      return res.status(201).json({ ok: true, total, inscricoes });
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ erro: 'Método não permitido.' });
  } catch (e) {
    console.error('inscricoes', e);
    return res.status(500).json({ erro: 'Não foi possível concluir agora. Tente novamente.' });
  }
};
