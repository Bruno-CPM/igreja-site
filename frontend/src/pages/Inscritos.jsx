import { useState } from 'react';
import { EVENTOS } from '../data/eventos';
import '../components/InscricaoEvento.css';
import './PageShared.css';

// Página interna (não aparece no menu): lista quem confirmou presença.
// Acesso: /inscritos, com a senha da liderança.
const comInscricao = EVENTOS.filter((ev) => ev.inscricoes);

export default function Inscritos() {
  const [eventoId, setEventoId] = useState(comInscricao[0]?.id || '');
  const [senha, setSenha] = useState('');
  const [dados, setDados] = useState(null);
  const [status, setStatus] = useState('livre');
  const [erro, setErro] = useState('');

  async function carregar(e) {
    e.preventDefault();
    setStatus('carregando');
    setErro('');
    try {
      const r = await fetch(`/api/inscricoes?evento=${encodeURIComponent(eventoId)}&lista=1`, {
        headers: { 'x-senha': senha },
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(d.erro || 'Não foi possível carregar.');
      setDados(d);
      setStatus('ok');
    } catch (err) {
      setErro(err.message);
      setStatus('erro');
    }
  }

  function baixarCsv() {
    const linhas = [['Nome', 'WhatsApp', 'Pessoas', 'Data da inscrição']].concat(
      dados.lista.map((i) => [i.nome, i.telefone, i.pessoas, new Date(i.criadoEm).toLocaleString('pt-BR')])
    );
    const csv = linhas.map((l) => l.map((c) => `"${String(c ?? '').replace(/"/g, '""')}"`).join(';')).join('\n');
    const url = URL.createObjectURL(new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `inscritos-${eventoId}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const ev = comInscricao.find((e) => e.id === eventoId);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Uso interno</span>
          <h1>Inscritos</h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <form className="inscritos-login" onSubmit={carregar}>
            {comInscricao.length > 1 && (
              <select value={eventoId} onChange={(e) => setEventoId(e.target.value)}>
                {comInscricao.map((e) => <option key={e.id} value={e.id}>{e.titulo}</option>)}
              </select>
            )}
            <input type="password" required placeholder="Senha da liderança" value={senha} onChange={(e) => setSenha(e.target.value)} />
            <button className="btn btn-primary" type="submit" disabled={status === 'carregando'}>
              {status === 'carregando' ? 'Carregando...' : 'Ver inscritos'}
            </button>
          </form>
          {status === 'erro' && <p className="form-feedback form-feedback--erro">{erro}</p>}

          {dados && (
            <>
              <div className="inscritos-resumo">
                <div className="inscricao__contador">
                  <span className="inscricao__numero">{dados.total}</span>
                  <span className="inscricao__rotulo">pessoas confirmadas</span>
                </div>
                <div className="inscricao__contador">
                  <span className="inscricao__numero">{dados.inscricoes}</span>
                  <span className="inscricao__rotulo">inscrições</span>
                </div>
              </div>
              <p>{ev?.titulo}{ev?.convidado ? ` com ${ev.convidado}` : ''}</p>
              {dados.lista.length > 0 && (
                <button className="btn btn-primary" type="button" onClick={baixarCsv}>Baixar planilha (CSV)</button>
              )}
              <div className="inscritos-tabela-wrap">
                <table className="inscritos-tabela">
                  <thead>
                    <tr><th>#</th><th>Nome</th><th>WhatsApp</th><th>Pessoas</th><th>Inscrição</th></tr>
                  </thead>
                  <tbody>
                    {dados.lista.map((i, n) => (
                      <tr key={i.id}>
                        <td>{n + 1}</td>
                        <td>{i.nome}</td>
                        <td>{i.telefone || '—'}</td>
                        <td>{i.pessoas}</td>
                        <td>{new Date(i.criadoEm).toLocaleString('pt-BR')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
