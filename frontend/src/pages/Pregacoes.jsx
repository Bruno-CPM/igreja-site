import { useEffect, useMemo, useState } from 'react';
import Reveal from '../components/Reveal';
import { getPregacoes } from '../services/api';
import heroPregacoes from '../assets/hero-pregacoes.jpeg';
import './PageShared.css';

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
          {erro && <p className="placeholder-note" style={{ marginTop: 24 }}>Não foi possível carregar as pregações agora.</p>}

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
