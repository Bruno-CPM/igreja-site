import { useEffect, useState } from 'react';
import Reveal from '../components/Reveal';
import ArchDivider from '../components/ArchDivider';
import { getServicos } from '../services/api';
import './PageShared.css';

export default function Servicos() {
  const [servicos, setServicos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    getServicos()
      .then(setServicos)
      .catch(() => setErro(true))
      .finally(() => setCarregando(false));
  }, []);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <span className="eyebrow">O que oferecemos</span>
            <h1>Serviços da igreja</h1>
            <p className="placeholder-note">
              [Texto introdutório sobre os serviços/ministérios a ser fornecido.]
            </p>
          </Reveal>
        </div>
      </section>

      <ArchDivider />

      <section className="section">
        <div className="container">
          {carregando && <p className="placeholder-note">Carregando serviços...</p>}
          {erro && <p className="placeholder-note">Não foi possível carregar os serviços agora.</p>}

          <div className="service-grid">
            {servicos.map((s, i) => (
              <Reveal key={s.id} delay={i * 90}>
                <div className="card service-card">
                  <div className="service-card__icon" aria-hidden="true">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M12 2 C6 2 6 10 6 10 V22 H18 V10 C18 10 18 2 12 2 Z" />
                    </svg>
                  </div>
                  <h3>{s.nome}</h3>
                  {s.horario && <span className="tag">{s.horario}</span>}
                  <p>{s.descricao}</p>
                </div>
              </Reveal>
            ))}
            {!carregando && !erro && servicos.length === 0 && (
              <p className="placeholder-note">Nenhum serviço cadastrado ainda.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
