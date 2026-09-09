import { useEffect, useState } from 'react';
import Reveal from '../components/Reveal';
import { getPregadores } from '../services/api';
import './PageShared.css';

function iniciais(nome = '') {
  return nome.split(' ').filter(Boolean).slice(0, 2).map((n) => n[0]).join('').toUpperCase();
}

export default function Pregadores() {
  const [pregadores, setPregadores] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    getPregadores()
      .then(setPregadores)
      .catch(() => setErro(true))
      .finally(() => setCarregando(false));
  }, []);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Quem prega entre nós</span>
            <h1>Pregadores</h1>
            <p className="placeholder-note">
              Conheça os pastores e ministros que compartilham a Palavra em nossa igreja.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {carregando && <p className="placeholder-note">Carregando pregadores...</p>}
          {erro && <p className="placeholder-note">Não foi possível carregar os pregadores agora.</p>}
          {!carregando && !erro && pregadores.length === 0 && (
            <div className="empty-state"><p>Nenhum pregador cadastrado ainda.</p></div>
          )}

          <div className="grid-3">
            {pregadores.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 90}>
                <div className="card preacher-card">
                  <div className="preacher-card__img">
                    {p.fotoUrl ? <img src={p.fotoUrl} alt={p.nome} /> : <span>{iniciais(p.nome)}</span>}
                  </div>
                  <div className="preacher-card__body">
                    <h3>{p.nome}</h3>
                    {p.cargo && <span className="tag">{p.cargo}</span>}
                    <p>{p.biografia}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
