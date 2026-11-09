import { useState } from 'react';
import Reveal from '../components/Reveal';
import HoverVideo from '../components/HoverVideo';
import {
  proximosEventos,
  eventosRealizados,
  dataDoEvento,
  linkDoMapa,
  mapaEmbutido,
} from '../data/eventos';
import heroEventos from '../assets/hero-eventos.jpeg';
import './PageShared.css';

const formatarData = (ev) =>
  dataDoEvento(ev).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });

const diasAte = (ev) => {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  return Math.round((dataDoEvento(ev) - hoje) / 86400000);
};

const textoContagem = (ev) => {
  const dias = diasAte(ev);
  if (dias === 0) return 'É hoje!';
  if (dias === 1) return 'É amanhã!';
  return `Faltam ${dias} dias`;
};

// Anúncio do evento: capa/vídeo, informações e mapa do local.
function EventoDestaque({ ev }) {
  const dia = dataDoEvento(ev).toLocaleDateString('pt-BR', { day: '2-digit' });
  const mes = dataDoEvento(ev).toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '');

  return (
    <div className="event-feature">
      <div className="event-feature__media">
        {ev.video ? (
          <HoverVideo src={ev.video} capa={ev.capa} capaAlt={`Arte do evento ${ev.titulo}`} />
        ) : (
          ev.capa && <img className="event-feature__capa" src={ev.capa} alt={`Arte do evento ${ev.titulo}`} />
        )}
        {ev.video && <p className="event-feature__hint">Passe o mouse sobre a arte (ou toque, no celular) para ver o vídeo</p>}
      </div>

      <div className="event-feature__info card">
        <div className="event-feature__top">
          <div className="event-feature__date">
            <span className="event-feature__day">{dia}</span>
            <span className="event-feature__month">{mes}</span>
          </div>
          <div>
            <span className="event-feature__countdown">{textoContagem(ev)}</span>
            <h2 className="event-feature__title">{ev.titulo}</h2>
            {ev.convidado && <p className="event-feature__guest">com {ev.convidado}</p>}
          </div>
        </div>

        <ul className="event-feature__details">
          <li><strong>Data:</strong> {formatarData(ev)}{ev.horario ? ` · ${ev.horario}` : ''}</li>
          <li><strong>Local:</strong> {ev.local}</li>
          {ev.endereco && <li><strong>Endereço:</strong> {ev.endereco}</li>}
        </ul>
        {ev.descricao && <p>{ev.descricao}</p>}

        {ev.endereco && (
          <>
            <div className="event-feature__map">
              <iframe
                title={`Mapa do local do evento ${ev.titulo}`}
                src={mapaEmbutido(ev.endereco)}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <a className="btn btn-primary" href={linkDoMapa(ev.endereco)} target="_blank" rel="noopener noreferrer">
              Como chegar
            </a>
          </>
        )}
      </div>
    </div>
  );
}

export default function Eventos() {
  const [aba, setAba] = useState('proximos'); // 'proximos' | 'realizados'
  const proximos = proximosEventos();
  const realizados = eventosRealizados();
  const [destaque, ...demais] = proximos;

  return (
    <>
      <section className="page-hero page-hero--photo" style={{ backgroundImage: `url(${heroEventos})` }}>
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

          {aba === 'proximos' && (
            <>
              {destaque ? (
                <Reveal>
                  <EventoDestaque ev={destaque} />
                </Reveal>
              ) : (
                <div className="empty-state">
                  <p>Nenhum evento especial agendado no momento. Venha nos visitar no culto de domingo, às 18h!</p>
                </div>
              )}

              {demais.length > 0 && (
                <div className="grid-3" style={{ marginTop: 40 }}>
                  {demais.map((ev, i) => (
                    <Reveal key={ev.id} delay={(i % 3) * 90}>
                      <CartaoEvento ev={ev} />
                    </Reveal>
                  ))}
                </div>
              )}
            </>
          )}

          {aba === 'realizados' && (
            realizados.length === 0 ? (
              <div className="empty-state">
                <p>Em breve você verá aqui os eventos que a igreja já realizou.</p>
              </div>
            ) : (
              <div className="grid-3">
                {realizados.map((ev, i) => (
                  <Reveal key={ev.id} delay={(i % 3) * 90}>
                    <CartaoEvento ev={ev} />
                  </Reveal>
                ))}
              </div>
            )
          )}
        </div>
      </section>
    </>
  );
}

function CartaoEvento({ ev }) {
  return (
    <div className="card event-card">
      {ev.capa && (
        <div className="event-card__img">
          <img src={ev.capa} alt={ev.titulo} />
        </div>
      )}
      <div className="event-card__body">
        <span className="event-card__date">{formatarData(ev)}</span>
        <h3>{ev.titulo}</h3>
        {ev.convidado && <p className="sermon-list-card__meta">com {ev.convidado}</p>}
        <p className="sermon-list-card__meta">{ev.local}{ev.horario ? ` · ${ev.horario}` : ''}</p>
      </div>
    </div>
  );
}
