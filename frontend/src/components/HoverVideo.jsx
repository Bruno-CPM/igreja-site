import { useRef, useState } from 'react';
import './HoverVideo.css';

// Vídeo que toca ao passar o mouse e para (voltando ao início) ao tirar o mouse.
// Com `capa`, uma imagem cobre o vídeo e some enquanto ele toca.
// No celular não existe "passar o mouse": um toque inicia ou para.
export default function HoverVideo({ src, capa, capaAlt = '', legenda, className = '' }) {
  const videoRef = useRef(null);
  const [tocando, setTocando] = useState(false);

  // Toca com som; se o navegador bloquear o som, toca sem som.
  const iniciar = () => {
    const v = videoRef.current;
    if (!v) return;
    setTocando(true);
    v.muted = false;
    v.play().catch(() => {
      v.muted = true;
      v.play().catch(() => {});
    });
  };

  const parar = () => {
    const v = videoRef.current;
    if (!v) return;
    setTocando(false);
    v.pause();
    v.currentTime = 0;
  };

  const alternar = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) iniciar();
    else parar();
  };

  return (
    <figure className={`hover-video ${capa ? 'hover-video--capa' : ''} ${className}`}>
      <div
        className={`hover-video__frame ${tocando ? 'is-playing' : ''}`}
        onMouseEnter={iniciar}
        onMouseLeave={parar}
        onTouchStart={alternar}
      >
        <video
          ref={videoRef}
          className="hover-video__video"
          src={src}
          playsInline
          preload="metadata"
          onEnded={parar}
        />
        {capa && <img className="hover-video__capa" src={capa} alt={capaAlt} />}
      </div>
      {legenda && <figcaption className="hover-video__caption">{legenda}</figcaption>}
    </figure>
  );
}
