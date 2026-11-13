import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './InscricaoEvento.css';

// Formulário de confirmação de presença de um evento (o total fica só na página /inscritos).
// Os dados ficam na função /api/inscricoes (Vercel Blob).
export default function InscricaoEvento({ ev }) {
  const [form, setForm] = useState({ nome: '', telefone: '', pessoas: 1 });
  const [status, setStatus] = useState('livre'); // livre | enviando | sucesso | erro
  const [msgErro, setMsgErro] = useState('');
  const caixa = useRef(null);
  const { hash } = useLocation();

  // Vindo do botão "Fazer Inscrição" da página inicial: rola até o formulário.
  useEffect(() => {
    if (hash !== '#inscricao' || !caixa.current) return;
    const t = setTimeout(() => caixa.current.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
    return () => clearTimeout(t);
  }, [hash]);

  const alterar = (campo) => (e) => setForm({ ...form, [campo]: e.target.value });

  async function enviar(e) {
    e.preventDefault();
    setStatus('enviando');
    setMsgErro('');
    try {
      const r = await fetch('/api/inscricoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ evento: ev.id, ...form, pessoas: Number(form.pessoas) }),
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(d.erro || 'Não foi possível enviar agora. Tente novamente.');
      setStatus('sucesso');
      try { localStorage.setItem(`inscrito-${ev.id}`, '1'); } catch (_) { /* sem armazenamento */ }
    } catch (err) {
      setMsgErro(err.message);
      setStatus('erro');
    }
  }

  let jaInscrito = false;
  try { jaInscrito = localStorage.getItem(`inscrito-${ev.id}`) === '1'; } catch (_) { /* sem armazenamento */ }

  return (
    <div className="inscricao" id="inscricao" ref={caixa}>
      {status === 'sucesso' ? (
        <p className="form-feedback form-feedback--ok inscricao__ok">
          Presença confirmada! Esperamos você{Number(form.pessoas) > 1 ? 's' : ''} no {ev.titulo}.
        </p>
      ) : (
        <form className="inscricao__form" onSubmit={enviar}>
          <h3 className="inscricao__titulo">Confirme sua presença</h3>
          {jaInscrito && (
            <p className="inscricao__aviso">Você já confirmou presença neste aparelho. Só envie de novo para outras pessoas.</p>
          )}
          <label>
            Nome
            <input type="text" required minLength={2} maxLength={100} value={form.nome} onChange={alterar('nome')} placeholder="Seu nome completo" />
          </label>
          <label>
            <span>WhatsApp <span className="inscricao__opcional">(opcional)</span></span>
            <input type="tel" maxLength={25} value={form.telefone} onChange={alterar('telefone')} placeholder="(61) 90000-0000" />
          </label>
          <label>
            Quantas pessoas vão (contando com você)?
            <input type="number" required min={1} max={10} value={form.pessoas} onChange={alterar('pessoas')} />
          </label>
          <button type="submit" className="btn btn-primary" disabled={status === 'enviando'}>
            {status === 'enviando' ? 'Enviando...' : 'Confirmar presença'}
          </button>
          {status === 'erro' && <p className="form-feedback form-feedback--erro">{msgErro}</p>}
        </form>
      )}
    </div>
  );
}
