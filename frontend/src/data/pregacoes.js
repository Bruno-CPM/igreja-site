import videoDestaque from '../assets/pregacao-destaque.mp4';
import videoDestaque2 from '../assets/pregacao-destaque-2.mp4';
import capaDestaque2 from '../assets/pregacao-destaque-2-capa.jpg';
import videoDestaque3 from '../assets/pregacao-destaque-3.mp4';
import videoDestaque4 from '../assets/pregacao-destaque-4.mp4';

// Vídeos curtos das pregações, usados na página Pregações e na prévia da página inicial.
// Para incluir outro, adicione um item aqui (o primeiro da lista aparece primeiro).
export const VIDEOS_DESTAQUE = [
  { src: videoDestaque, pregador: 'BI Deuzenir', titulo: 'É preciso voltar' },
  { src: videoDestaque2, capa: capaDestaque2, pregador: 'PR Isabela', titulo: 'O plano de Deus' },
  { src: videoDestaque3, pregador: 'BI Eduardo', titulo: 'Praticante da Palavra' },
  { src: videoDestaque4, pregador: 'PR Andre', titulo: 'O Avivamento' },
];
