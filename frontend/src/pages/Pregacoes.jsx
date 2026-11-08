import { useEffect, useMemo, useRef, useState } from 'react';
import Reveal from '../components/Reveal';
import { getPregacoes } from '../services/api';
import heroPregacoes from '../assets/hero-pregacoes.jpeg';
import videoDestaque from '../assets/pregacao-destaque.mp4';
import videoDestaque2 from '../assets/pregacao-destaque-2.mp4';
import './PageShared.css';

// Vídeos curtos em destaque. Para incluir outro, adicione um item aqui.
const VIDEOS_DESTAQUE = [
  { src: videoDestaque, legenda: 'BI Deuzenir – É preciso voltar' },
  { src: videoDestaque2, legenda: '' },
];

// Vídeo que toca ao passar o mouse e para (voltando ao início) ao tirar o mouse.
function VideoDestaque({ src, legenda }) {
  const videoRef = useRef(null);

  // Toca com som; se o navegador bloquear o som, toca sem som.
  const iniciar = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.play().catch(() => {
      v.muted = true;
      v.play().catch(() => {});
    });
  };

  const parar = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };

  // No celular não existe "passar o mouse": um toque inicia ou para.
  const alternar = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) iniciar();
    else parar();
  };

  return (
    <figure className="sermon-highlight">
      <video
        ref={videoRef}
        className="sermon-highlight__video"
        src={src}
        playsInline
        preload="metadata"
        onMouseEnter={iniciar}
        onMouseLeave={parar}
        onTouchStart={alternar}
        onEnded={parar}
      />
      {legenda && <figcaption className="sermon-highlight__caption">{legenda}</figcaption>}
    </figure>
  );
}

export default function Pregacoes() {
  const [pregacoes, setPregacoes] = useState([]);
  const [temaAtivo, setTemaAtivo] = useState('Todos');
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);
  useEffect(() => {
    getPregacoes()
      .then(setPregacoes)
      .catch(() => setErro(true))
      .finally(() => setCarregando(false));
  }, []);

  const temas = useMemo(() => {
    const unicos = Array.from(new Set(pregacoes.map((p) => p.tema).filter(Boolean)));
    return ['Todos', ...unicos];
  }, [pregacoes]);

  const filtradas = temaAtivo === 'Todos'
    ? pregacoes
    : pregacoes.filter((p) => p.tema === temaAtivo);

  return (
    <>
      <section className="page-hero page-hero--photo" style={{ backgroundImage: `url(${heroPregacoes})` }}>
        <div className="container">
          <Reveal>
            <span className="eyebrow">Palavra semanal</span>
            <h1>Pregações</h1>
            <p className="placeholder-note">
              Reveja as mensagens compartilhadas em nossos cultos.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="sermon-highlight-row">
            {VIDEOS_DESTAQUE.map((video, i) => (
              <Reveal key={i} delay={i * 90}>
                <VideoDestaque src={video.src} legenda={video.legenda} />
              </Reveal>
            ))}
          </div>

          {temas.length > 1 && (
            <div className="filter-row">
              {temas.map((tema) => (
                <button
                  key={tema}
                  className={`filter-chip ${temaAtivo === tema ? 'is-active' : ''}`}
                  onClick={() => setTemaAtivo(tema)}
                >
                  {tema}
                </button>
              ))}
            </div>
          )}

          {carregando && <p className="placeholder-note" style={{ marginTop: 24 }}>Carregando pregações...</p>}

          {!carregando && !erro && filtradas.length === 0 && (
            <div className="empty-state"><p>Nenhuma pregação encontrada.</p></div>
          )}

          <div className="grid-3">
            {filtradas.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 90}>
                <div className="card sermon-list-card">
                  {p.tema && <span className="tag">{p.tema}</span>}
                  <h3>{p.titulo}</h3>
                  <span className="sermon-list-card__meta">
                    {new Date(p.data).toLocaleDateString('pt-BR')}
                    {p.pregador ? ` · ${p.pregador.nome}` : ''}
                  </span>
                  <p>{p.descricao}</p>
                  {p.videoUrl ? (
                    <a href={p.videoUrl} target="_blank" rel="noreferrer" className="btn btn-ghost-dark">
                      Assistir vídeo
                    </a>
                  ) : (
                    <span className="placeholder-note">[vídeo a ser fornecido]</span>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
