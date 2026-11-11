import { useState } from 'react';
import Reveal from '../components/Reveal';
import fundoContato from '../assets/fundo-contato.jpg';
import './PageShared.css';
import './Contato.css';

const CAMPOS_INICIAIS = { nome: '', email: '', telefone: '', texto: '' };

// WhatsApp da igreja (só números: 55 + DDD + número).
const WHATSAPP_IGREJA = '5561999674458';
const WHATSAPP_EXIBIDO = '(61) 99967-4458';

const linkWhatsApp = (texto) =>
  `https://wa.me/${WHATSAPP_IGREJA}${texto ? `?text=${encodeURIComponent(texto)}` : ''}`;

function montarMensagem({ nome, email, telefone, texto }) {
  const linhas = [`Olá! Meu nome é ${nome.trim()}.`, '', texto.trim()];
  const contatos = [];
  if (email.trim()) contatos.push(`E-mail: ${email.trim()}`);
  if (telefone.trim()) contatos.push(`Telefone: ${telefone.trim()}`);
  if (contatos.length) linhas.push('', ...contatos);
  linhas.push('', '(Enviado pelo site)');
  return linhas.join('\n');
}

export default function Contato() {
  const [form, setForm] = useState(CAMPOS_INICIAIS);
  const [link, setLink] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Abre o WhatsApp da pessoa com a mensagem pronta para a igreja.
  // A resposta automática vem da "Mensagem de saudação" do WhatsApp Business da igreja.
  const handleSubmit = (e) => {
    e.preventDefault();
    const url = linkWhatsApp(montarMensagem(form));
    setLink(url);
    // Sem 'noopener' aqui: com ele o navegador sempre devolve null e a página abriria duas vezes.
    const aba = window.open(url, '_blank');
    if (aba) aba.opener = null;
    else window.location.href = url; // pop-up bloqueado: abre na mesma aba
  };

  return (
    <div className="contato-fundo" style={{ '--fundo-contato': `url(${fundoContato})` }}>
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Estamos aqui para ouvir você</span>
            <h1>Contato</h1>
          </Reveal>
        </div>
      </section>

      <section className="section contato-form-section">
        <div className="container">
          <Reveal>
            <p className="page-intro contato-intro">
              Envie sua mensagem, dúvida ou pedido de oração
            </p>
          </Reveal>
        </div>
        <div className="container contato-grid">
          <Reveal as="form" className="card contato-form" onSubmit={handleSubmit}>
            <label>
              Nome
              <input name="nome" value={form.nome} onChange={handleChange} required />
            </label>
            <label>
              <span>E-mail <span className="contato-opcional">(opcional)</span></span>
              <input type="email" name="email" value={form.email} onChange={handleChange} />
            </label>
            <label>
              <span>Telefone <span className="contato-opcional">(opcional)</span></span>
              <input name="telefone" value={form.telefone} onChange={handleChange} />
            </label>
            <label>
              Mensagem
              <textarea name="texto" rows="5" value={form.texto} onChange={handleChange} required />
            </label>

            <button type="submit" className="btn btn-primary btn-whatsapp">
              Enviar pelo WhatsApp
            </button>

            {link && (
              <p className="form-feedback form-feedback--ok">
                Abrimos o WhatsApp com a sua mensagem. Se não abriu,{' '}
                <a href={link} target="_blank" rel="noopener noreferrer">toque aqui</a>.
              </p>
            )}

            <p className="contato-direto">
              Prefere conversar direto?{' '}
              <a href={linkWhatsApp('Olá! Vim pelo site da igreja.')} target="_blank" rel="noopener noreferrer">
                Fale com a gente no WhatsApp: <span className="contato-numero">{WHATSAPP_EXIBIDO}</span>
              </a>
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
