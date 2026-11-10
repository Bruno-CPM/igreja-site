import { useEffect, useState } from 'react';
import Reveal from '../components/Reveal';
import { getPregadores } from '../services/api';
import fotoEduardo from '../assets/pregador-foto-1.jpg';
import fotoAndre from '../assets/pregador-foto-2.jpg';
import fotoIsabela from '../assets/pregador-foto-3.jpg';
import fotoAlfredo from '../assets/pregador-foto-4.jpg';
import './PageShared.css';

// Pregadores com foto fixa no site. Para incluir outro, adicione um item aqui.
const PREGADORES_FIXOS = [
  { id: 'local-eduardo', nome: 'BI Eduardo', fotoUrl: fotoEduardo },
  { id: 'local-andre', nome: 'PR Andre', fotoUrl: fotoAndre },
  { id: 'local-isabela', nome: 'PR Isabela', fotoUrl: fotoIsabela },
  { id: 'local-alfredo', nome: 'Pastor Alfredo Fujiwara', fotoUrl: fotoAlfredo },
];

function iniciais(nome = '') {
  return nome.split(' ').filter(Boolean).slice(0, 2).map((n) => n[0]).join('').toUpperCase();
}

export default function Pregadores() {
  const [pregadores, setPregadores] = useState(PREGADORES_FIXOS);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    getPregadores()
      .then((daApi) => {
        const nomesFixos = PREGADORES_FIXOS.map((p) => p.nome.toLowerCase());
        setPregadores([...PREGADORES_FIXOS, ...daApi.filter((p) => !nomesFixos.includes((p.nome || '').toLowerCase()))]);
      })
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
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <p className="page-intro">Conheça os pastores e ministros que compartilham a Palavra em nossa igreja</p>
          </Reveal>
        </div>
        <div className="container">
          {carregando && <p className="placeholder-note">Carregando pregadores...</p>}
          {erro && pregadores.length === 0 && <p className="placeholder-note">Não foi possível carregar os pregadores agora.</p>}
          {!carregando && !erro && pregadores.length === 0 && (
            <div className="empty-state"><p>Nenhum pregador cadastrado ainda.</p></div>
          )}

          <div className="grid-3">
            {pregadores.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 90}>
                <div className="card preacher-card">
                  <div className={`preacher-card__img${p.fotoUrl ? ' preacher-card__img--foto' : ''}`}>
                    {p.fotoUrl ? <img src={p.fotoUrl} alt={p.nome} /> : <span>{iniciais(p.nome)}</span>}
                  </div>
                  <div className="preacher-card__body">
                    <h3>{p.nome}</h3>
                    {p.cargo && <span className="tag">{p.cargo}</span>}
                    {p.biografia && <p>{p.biografia}</p>}
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
