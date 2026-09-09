import Reveal from '../components/Reveal';
import './PageShared.css';

const VALORES = [
  { titulo: 'Fé', texto: '[texto a ser fornecido]' },
  { titulo: 'Família', texto: '[texto a ser fornecido]' },
  { titulo: 'Comunidade', texto: '[texto a ser fornecido]' },
  { titulo: 'Serviço', texto: '[texto a ser fornecido]' },
];

export default function Sobre() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Quem somos</span>
            <h1>Sobre a igreja</h1>
            <p className="placeholder-note">
              [Texto institucional a ser fornecido: história da igreja, ano de fundação e trajetória.]
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container two-col">
          <Reveal>
            <h2>Nossa missão</h2>
            <p className="placeholder-note">[Texto da missão a ser fornecido.]</p>
          </Reveal>
          <Reveal delay={100}>
            <h2>Nossa visão</h2>
            <p className="placeholder-note">[Texto da visão a ser fornecido.]</p>
          </Reveal>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <Reveal>
            <span className="eyebrow">O que nos guia</span>
            <h2>Nossos valores</h2>
          </Reveal>
          <div className="value-grid">
            {VALORES.map((v, i) => (
              <Reveal key={v.titulo} delay={i * 90}>
                <div className="card value-card">
                  <h3>{v.titulo}</h3>
                  <p className="placeholder-note">{v.texto}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container two-col">
          <Reveal className="arch-frame media-placeholder">
            <span>[imagem da liderança / templo a ser fornecida]</span>
          </Reveal>
          <Reveal delay={100}>
            <span className="eyebrow">Nossa história</span>
            <h2>De onde viemos</h2>
            <p className="placeholder-note">
              [Texto sobre a história da igreja a ser fornecido — fundação, marcos importantes e crescimento da comunidade ao longo dos anos.]
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
