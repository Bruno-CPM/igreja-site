import { useState } from 'react';
import Reveal from '../components/Reveal';
import { enviarContato } from '../services/api';
import './PageShared.css';
import './Contato.css';

const CAMPOS_INICIAIS = { nome: '', email: '', telefone: '', texto: '' };

export default function Contato() {
  const [form, setForm] = useState(CAMPOS_INICIAIS);
  const [status, setStatus] = useState('idle'); // idle | enviando | sucesso | erro

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('enviando');
    try {
      await enviarContato(form);
      setStatus('sucesso');
      setForm(CAMPOS_INICIAIS);
    } catch {
      setStatus('erro');
    }
  };

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Estamos aqui para ouvir você</span>
            <h1>Contato</h1>
            <p className="placeholder-note">
              Envie sua mensagem, dúvida ou pedido de oração. Responderemos em breve.
            </p>
          </Reveal>

          <Reveal delay={80} className="contato-quick-info">
            <div className="contato-quick-info__item">
              <span className="contato-quick-info__label">Endereço</span>
              <span>QS 304 - Samambaia, Brasília - DF, 72306-503</span>
            </div>
            <div className="contato-quick-info__item">
              <span className="contato-quick-info__label">Telefone</span>
              <a href="https://wa.me/5561999674458" target="_blank" rel="noreferrer">(61) 99967-4458</a>
            </div>
            <div className="contato-quick-info__item">
              <span className="contato-quick-info__label">Instagram</span>
              <a href="https://www.instagram.com/vinculodapaz" target="_blank" rel="noreferrer">@vinculodapaz</a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section contato-form-section">
        <div className="container contato-grid">
          <Reveal as="form" className="card contato-form" onSubmit={handleSubmit}>
            <label>
              Nome
              <input name="nome" value={form.nome} onChange={handleChange} required />
            </label>
            <label>
              E-mail
              <input type="email" name="email" value={form.email} onChange={handleChange} required />
            </label>
            <label>
              Telefone
              <input name="telefone" value={form.telefone} onChange={handleChange} />
            </label>
            <label>
              Mensagem
              <textarea name="texto" rows="5" value={form.texto} onChange={handleChange} required />
            </label>

            <button type="submit" className="btn btn-primary" disabled={status === 'enviando'}>
              {status === 'enviando' ? 'Enviando...' : 'Enviar mensagem'}
            </button>

            {status === 'sucesso' && <p className="form-feedback form-feedback--ok">Mensagem enviada com sucesso!</p>}
            {status === 'erro' && <p className="form-feedback form-feedback--erro">Não foi possível enviar agora. Tente novamente.</p>}
          </Reveal>
        </div>
      </section>
    </>
  );
}
