import { useMemo, useState } from 'react';
import Reveal from '../components/Reveal';
import { enviarContato, enviarLembreteDizimo } from '../services/api';
import { buildPixPayload } from '../services/pix';
import './PageShared.css';
import './Contato.css';

const CAMPOS_INICIAIS = { nome: '', email: '', telefone: '', texto: '' };
const LEMBRETE_INICIAL = { nome: '', canal: 'email', contato: '', diaPreferido: '5' };

const PIX_CONFIG = {
  chave: '08366083000149', // CNPJ da Comunidade Crista Apostolica Vinculo da Paz
  nome: 'Comunidade Crista Apostolica Vinculo da Paz',
  cidade: 'Brasilia',
};

const VALORES_SUGERIDOS = [50, 100, 200];
const DIAS_DO_MES = Array.from({ length: 28 }, (_, i) => i + 1);

export default function Contato() {
  const [form, setForm] = useState(CAMPOS_INICIAIS);
  const [status, setStatus] = useState('idle'); // idle | enviando | sucesso | erro

  const [valorDizimo, setValorDizimo] = useState('');
  const [pixCopiado, setPixCopiado] = useState(false);

  const [lembrete, setLembrete] = useState(LEMBRETE_INICIAL);
  const [lembreteStatus, setLembreteStatus] = useState('idle'); // idle | enviando | sucesso | erro

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

  const pixConfigurado = Boolean(PIX_CONFIG.chave);

  const codigoPix = useMemo(() => {
    if (!pixConfigurado) return null;
    return buildPixPayload({
      chave: PIX_CONFIG.chave,
      nome: PIX_CONFIG.nome,
      cidade: PIX_CONFIG.cidade,
      valor: valorDizimo,
    });
  }, [pixConfigurado, valorDizimo]);

  const handleCopiarPix = async () => {
    if (!codigoPix) return;
    try {
      await navigator.clipboard.writeText(codigoPix);
      setPixCopiado(true);
      setTimeout(() => setPixCopiado(false), 2500);
    } catch {
      setPixCopiado(false);
    }
  };

  const handleLembreteChange = (e) => {
    const { name, value } = e.target;
    setLembrete((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'canal' ? { contato: '' } : {}),
    }));
  };

  const handleLembreteSubmit = async (e) => {
    e.preventDefault();
    setLembreteStatus('enviando');
    try {
      await enviarLembreteDizimo({
        ...lembrete,
        diaPreferido: Number(lembrete.diaPreferido),
      });
      setLembreteStatus('sucesso');
      setLembrete(LEMBRETE_INICIAL);
    } catch {
      setLembreteStatus('erro');
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
        </div>
      </section>

      <section className="section">
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

      <section className="section section-alt">
        <div className="container dizimo-grid">
          <Reveal className="card dizimo-card">
            <span className="eyebrow">Contribua com o dízimo</span>
            <h2>Pix Copia e Cola</h2>
            <p>
              Escolha um valor (opcional) e copie o código Pix abaixo para colar diretamente
              no aplicativo do seu banco.
            </p>

            {pixConfigurado ? (
              <>
                <div className="dizimo-valores">
                  {VALORES_SUGERIDOS.map((v) => (
                    <button
                      key={v}
                      type="button"
                      className={`dizimo-valor-chip ${Number(valorDizimo) === v ? 'is-active' : ''}`}
                      onClick={() => setValorDizimo(String(v))}
                    >
                      R$ {v}
                    </button>
                  ))}
                  <label className="dizimo-valor-custom">
                    R$
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="Outro valor"
                      value={valorDizimo}
                      onChange={(e) => setValorDizimo(e.target.value)}
                    />
                  </label>
                </div>

                <label className="dizimo-codigo-label">
                  Código Pix
                  <textarea className="dizimo-codigo" rows="3" readOnly value={codigoPix} onFocus={(e) => e.target.select()} />
                </label>

                <button type="button" className="btn btn-primary" onClick={handleCopiarPix}>
                  {pixCopiado ? 'Código copiado!' : 'Copiar código Pix'}
                </button>
              </>
            ) : (
              <p className="placeholder-note">[Chave Pix da igreja a ser configurada]</p>
            )}
          </Reveal>

          <Reveal delay={100} as="form" className="card dizimo-card" onSubmit={handleLembreteSubmit}>
            <span className="eyebrow">Não quer esquecer</span>
            <h2>Lembrete mensal</h2>
            <p>
              Cadastre-se para receber um lembrete todo mês, por e-mail ou WhatsApp, na data
              que você preferir. Não é uma cobrança automática — é só um aviso.
            </p>

            <label>
              Nome
              <input name="nome" value={lembrete.nome} onChange={handleLembreteChange} required />
            </label>

            <div className="dizimo-canal">
              <label className="dizimo-canal__option">
                <input
                  type="radio"
                  name="canal"
                  value="email"
                  checked={lembrete.canal === 'email'}
                  onChange={handleLembreteChange}
                />
                E-mail
              </label>
              <label className="dizimo-canal__option">
                <input
                  type="radio"
                  name="canal"
                  value="whatsapp"
                  checked={lembrete.canal === 'whatsapp'}
                  onChange={handleLembreteChange}
                />
                WhatsApp
              </label>
            </div>

            <label>
              {lembrete.canal === 'whatsapp' ? 'Número de WhatsApp' : 'E-mail'}
              <input
                type={lembrete.canal === 'whatsapp' ? 'tel' : 'email'}
                name="contato"
                placeholder={lembrete.canal === 'whatsapp' ? '(11) 91234-5678' : 'voce@exemplo.com'}
                value={lembrete.contato}
                onChange={handleLembreteChange}
                required
              />
            </label>

            <label>
              Dia do mês preferido
              <select name="diaPreferido" value={lembrete.diaPreferido} onChange={handleLembreteChange}>
                {DIAS_DO_MES.map((dia) => (
                  <option key={dia} value={dia}>Dia {dia}</option>
                ))}
              </select>
            </label>

            <button type="submit" className="btn btn-ghost-dark" disabled={lembreteStatus === 'enviando'}>
              {lembreteStatus === 'enviando' ? 'Enviando...' : 'Ativar lembrete'}
            </button>

            {lembreteStatus === 'sucesso' && <p className="form-feedback form-feedback--ok">Lembrete ativado com sucesso!</p>}
            {lembreteStatus === 'erro' && <p className="form-feedback form-feedback--erro">Não foi possível ativar agora. Tente novamente.</p>}
          </Reveal>
        </div>
      </section>
    </>
  );
}
