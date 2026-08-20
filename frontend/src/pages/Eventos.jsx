import { useEffect, useState } from 'react';
import Reveal from '../components/Reveal';
import ArchDivider from '../components/ArchDivider';
import { getEventos } from '../services/api';
import './PageShared.css';

export default function Eventos() {
  const [aba, setAba] = useState('proximos'); // 'proximos' | 'realizados'
  const [eventos, setEventos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    setCarregando(true);
    setErro(false);
    getEventos(aba === 'realizados')
      .then(setEventos)
      .catch(() => setErro(true))
      .finally(() => setCarregando(false));
  }, [aba]);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Agenda da igreja</span>
            <h1>Eventos</h1>
            <p className="placeholder-note">
              Acompanhe os próximos eventos e relembre os eventos que a igreja já realizou.
            </p>
          </Reveal>
        </div>
      </section>

      <ArchDivider />

      <section className="section">
        <div className="container">
          <div className="tabs" role="tablist" aria-label="Filtro de eventos">
            <button
              role="tab"
              aria-selected={aba === 'proximos'}
              className={`tab-btn ${aba === 'proximos' ? 'is-active' : ''}`}
              onClick={() => setAba('proximos')}
            >
              Próximos eventos
            </button>
            <button
              role="tab"
              aria-selected={aba === 'realizados'}
              className={`tab-btn ${aba === 'realizados' ? 'is-active' : ''}`}
              onClick={() => setAba('realizados')}
            >
              Eventos que já realizamos
            </button>
          </div>

          {carregando && <p className="placeholder-note" style={{ marginTop: 24 }}>Carregando eventos...</p>}
          {erro && <p className="placeholder-note" style={{ marginTop: 24 }}>Não foi possível carregar os eventos agora.</p>}

          {!carregando && !erro && eventos.length === 0 && (
            <div className="empty-state">
              <p>
                {aba === 'proximos'
                  ? 'Nenhum evento futuro cadastrado no momento.'
                  : 'Ainda não há eventos realizados cadastrados.'}
              </p>
            </div>
          )}

          <div className="grid-3">
            {eventos.map((ev, i) => (
              <Reveal key={ev.id} delay={(i % 3) * 90}>
                <div className="card event-card">
                  <div className="event-card__img">
                    {ev.imagemUrl ? (
                      <img src={ev.imagemUrl} alt={ev.titulo} />
                    ) : (
                      <span>[imagem do evento a ser fornecida]</span>
                    )}
                  </div>
                  <div className="event-card__body">
                    <span className="event-card__date">
                      {new Date(ev.data).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </span>
                    <h3>{ev.titulo}</h3>
                    <p className="sermon-list-card__meta">
                      {ev.local} {ev.horario ? `· ${ev.horario}` : ''}
                    </p>
                    <p>{ev.descricao}</p>
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
