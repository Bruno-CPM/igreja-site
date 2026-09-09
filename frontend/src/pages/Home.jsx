import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import heroVideo from '../assets/hero-capa.mp4';
import { getEventos, getPregacoes } from '../services/api';
import './Home.css';

export default function Home() {
  const [proximoEvento, setProximoEvento] = useState(null);
  const [pregacoes, setPregacoes] = useState([]);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    getEventos(false)
      .then((lista) => setProximoEvento(lista[0] || null))
      .catch(() => setErro(true));

    getPregacoes()
      .then((lista) => setPregacoes(lista.slice(0, 3)))
      .catch(() => setErro(true));
  }, []);

  return (
    <>
      <section className="hero">
        <video
          className="hero__video-bg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="hero__overlay" aria-hidden="true" />

        <div className="container hero__content">
          <span className="eyebrow">Sejam bem-vindos</span>
          <h1>Conservando a unidade do Espirito pelo Vinculo da Paz</h1>
          <p className="hero__lead">
            Acompanhe nossos cultos, eventos e pregações, e conheça a comunidade
            que celebra e serve junto, toda semana.
          </p>
          <div className="hero__actions">
            <Link to="/pregacoes" className="btn btn-primary">Assistir pregações</Link>
            <Link to="/eventos" className="btn btn-outline">Ver próximos eventos</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container home-intro">
          <Reveal as="div">
            <span className="eyebrow">Nossa comunidade</span>
            <h2>Fé vivida em comunidade, todos os dias</h2>
            <p className="placeholder-note">
              [Texto de apresentação da igreja a ser fornecido — missão, valores e história resumida.]
            </p>
          </Reveal>

          <div className="home-links">
            {[
              { to: '/sobre', title: 'Sobre a igreja', desc: 'Nossa história, missão e valores.' },
              { to: '/servicos', title: 'Serviços', desc: 'Cultos, ministérios e horários.' },
              { to: '/contato', title: 'Contato', desc: 'Fale com a nossa equipe.' },
            ].map((item, i) => (
              <Reveal key={item.to} delay={i * 100}>
                <Link to={item.to} className="card home-link-card">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  <span className="home-link-card__arrow">Saiba mais →</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Não perca</span>
            <h2>Próximo evento</h2>
          </Reveal>

          {proximoEvento ? (
            <Reveal delay={100} className="event-highlight card">
              <div className="event-highlight__date">
                <span>{new Date(proximoEvento.data).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}</span>
              </div>
              <div>
                <h3>{proximoEvento.titulo}</h3>
                <p>{proximoEvento.local} {proximoEvento.horario ? `· ${proximoEvento.horario}` : ''}</p>
                <p>{proximoEvento.descricao}</p>
                <Link to="/eventos" className="btn btn-ghost-dark">Ver todos os eventos</Link>
              </div>
            </Reveal>
          ) : (
            <p className="placeholder-note">
              {erro ? 'Não foi possível carregar os eventos agora.' : 'Nenhum evento futuro cadastrado ainda.'}
            </p>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Última mensagem</span>
            <h2>Pregações recentes</h2>
          </Reveal>

          <div className="sermon-preview-grid">
            {pregacoes.map((p, i) => (
              <Reveal key={p.id} delay={i * 100}>
                <div className="card sermon-card">
                  {p.tema && <span className="tag">{p.tema}</span>}
                  <h3>{p.titulo}</h3>
                  <p>{new Date(p.data).toLocaleDateString('pt-BR')} {p.pregador ? `· ${p.pregador.nome}` : ''}</p>
                </div>
              </Reveal>
            ))}
            {pregacoes.length === 0 && (
              <p className="placeholder-note">
                {erro ? 'Não foi possível carregar as pregações agora.' : 'Nenhuma pregação cadastrada ainda.'}
              </p>
            )}
          </div>

          <div className="home-cta-center">
            <Link to="/pregacoes" className="btn btn-primary">Ver todas as pregações</Link>
          </div>
        </div>
      </section>
    </>
  );
}
