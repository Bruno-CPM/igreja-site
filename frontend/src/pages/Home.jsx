import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import heroVideo from '../assets/hero-capa.mp4';
import HoverVideo from '../components/HoverVideo';
import { VIDEOS_DESTAQUE } from '../data/pregacoes';
import { proximosEventos, dataDoEvento } from '../data/eventos';
import './Home.css';

export default function Home() {
  const proximoEvento = proximosEventos()[0] || null;

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
            <Reveal delay={100} className={`event-highlight card${proximoEvento.capaFormato === 'story' ? ' event-highlight--story' : ''}`}>
              {proximoEvento.capa ? (
                <Link to="/eventos" className={`event-highlight__capa${proximoEvento.capaFormato === 'story' ? ' event-highlight__capa--story' : ''}`}>
                  <img src={proximoEvento.capa} alt={`Arte do evento ${proximoEvento.titulo}`} />
                </Link>
              ) : (
                <div className="event-highlight__date">
                  <span>{dataDoEvento(proximoEvento).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}</span>
                </div>
              )}
              <div>
                <h3>{proximoEvento.titulo}</h3>
                {proximoEvento.convidado && <p>com {proximoEvento.convidado}</p>}
                <p>
                  {[
                    dataDoEvento(proximoEvento).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' }),
                    proximoEvento.horario,
                    proximoEvento.local,
                  ].filter(Boolean).join(' · ')}
                </p>
                <p>{proximoEvento.descricao}</p>
                <div className="home-event__acoes">
                  {proximoEvento.inscricoes && (
                    <Link to="/eventos#inscricao" className="btn btn-primary">Fazer Inscrição</Link>
                  )}
                  <Link to="/eventos" className="btn btn-ghost-dark">Ver detalhes e local</Link>
                </div>
              </div>
            </Reveal>
          ) : (
            <p className="placeholder-note">
              Nenhum evento especial agendado no momento. Venha nos visitar no culto de domingo, às 18h!
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

          {/* Prévia: os vídeos curtos das pregações (tocam ao passar o mouse) */}
          <div className="sermon-highlight-row home-sermon-preview">
            {VIDEOS_DESTAQUE.map((video, i) => (
              <Reveal key={i} delay={i * 90}>
                <HoverVideo
                  src={video.src}
                  capa={video.capa}
                  capaAlt={`${video.pregador} – ${video.titulo}`}
                  rotulo={{ nome: video.pregador, titulo: video.titulo }}
                />
              </Reveal>
            ))}
          </div>

          <div className="home-cta-center">
            <Link to="/pregacoes" className="btn btn-primary">Ver todas as pregações</Link>
          </div>
        </div>
      </section>
    </>
  );
}
