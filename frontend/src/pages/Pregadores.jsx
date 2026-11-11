import { useEffect, useState } from 'react';
import Reveal from '../components/Reveal';
import { getPregadores } from '../services/api';
import fotoEduardo from '../assets/pregador-foto-1.jpg';
import fotoAndre from '../assets/pregador-foto-2.jpg';
import fotoIsabela from '../assets/pregador-foto-3.jpg';
import fotoAlfredo from '../assets/pregador-foto-4.jpg';
import fotoDeuzenir from '../assets/pregador-foto-5.jpg';
import fotoAndreia from '../assets/pregador-foto-6.jpg';
import './PageShared.css';

// Pregadores com foto fixa no site. Para incluir outro, adicione um item aqui.
// "sobre" (opcional): parágrafos que aparecem no verso da foto ao passar o mouse.
const PREGADORES_FIXOS = [
  { id: 'local-eduardo', nome: 'Bispo Eduardo Campos', fotoUrl: fotoEduardo },
  {
    id: 'local-andre',
    nome: 'Pastor Andre Quelhas',
    fotoUrl: fotoAndre,
    sobre: [
      'André Quelhas é pastor na igreja Vínculo da Paz, compositor e diretor musical. Tem 26 anos e é casado há 3 anos com Isabella Quelhas. Há 6 anos, o casal lidera junto os ministérios de louvor e arte da igreja, e André também atua no discipulado de jovens.',
      'Sua missão é conduzir uma igreja e uma geração a adorar Jesus em espírito e em verdade, por meio da adoração em todas as suas expressões.',
    ],
  },
  { id: 'local-isabela', nome: 'Pastora Isabela Quelhas', fotoUrl: fotoIsabela },
  { id: 'local-alfredo', nome: 'Pastor Alfredo Fujiwara', fotoUrl: fotoAlfredo },
  { id: 'local-deuzenir', nome: 'Bispa Deuzenir Campos', fotoUrl: fotoDeuzenir },
  { id: 'local-andreia', nome: 'Bispa Andreia Fujiwara', fotoUrl: fotoAndreia },
];

// Foto que vira ao passar o mouse (ou ao tocar, no celular) e mostra o "sobre" no verso.
function FotoComSobre({ p }) {
  const [virada, setVirada] = useState(false);
  return (
    <div
      className={`preacher-flip${virada ? ' is-virada' : ''}`}
      role="button"
      tabIndex={0}
      aria-pressed={virada}
      aria-label={`Sobre ${p.nome}`}
      onClick={() => setVirada((v) => !v)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setVirada((v) => !v); }
      }}
    >
      <div className="preacher-flip__inner">
        <div className="preacher-flip__face preacher-card__img preacher-card__img--foto">
          <img src={p.fotoUrl} alt={p.nome} />
          <span className="preacher-flip__dica">Sobre</span>
        </div>
        <div className="preacher-flip__face preacher-flip__verso">
          <span className="eyebrow">Sobre</span>
          <h4>{p.nome}</h4>
          {p.sobre.map((par, i) => <p key={i}>{par}</p>)}
        </div>
      </div>
    </div>
  );
}

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
                  {p.fotoUrl && p.sobre ? (
                    <FotoComSobre p={p} />
                  ) : (
                    <div className={`preacher-card__img${p.fotoUrl ? ' preacher-card__img--foto' : ''}`}>
                      {p.fotoUrl ? <img src={p.fotoUrl} alt={p.nome} /> : <span>{iniciais(p.nome)}</span>}
                    </div>
                  )}
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
