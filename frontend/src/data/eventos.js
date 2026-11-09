import rotaVideo from '../assets/evento-rota-dos-adoradores.mp4';
import rotaCapa from '../assets/evento-rota-dos-adoradores-capa.jpg';
import expoVideo from '../assets/evento-expo-gospel-2025.mp4';
import expoCapa from '../assets/evento-expo-gospel-2025-capa.jpg';

// Agenda de eventos da igreja.
// Para incluir um evento, adicione um item nesta lista.
// O site separa sozinho os próximos eventos dos já realizados, pela data.
export const EVENTOS = [
  {
    id: 'rota-dos-adoradores-2026',
    titulo: 'Rota dos Adoradores',
    convidado: 'Mateus Brito',
    data: '2026-11-28', // AAAA-MM-DD
    horario: '', // ex.: '19h'
    local: 'Vínculo da Paz',
    endereco: 'QS 304, Conjunto 2, Lote 8, Samambaia, Brasília - DF',
    descricao: 'Uma noite de adoração na Vínculo da Paz com Mateus Brito.',
    video: rotaVideo,
    capa: rotaCapa,
  },
  {
    id: 'expo-gospel-2025',
    titulo: 'Expo Gospel',
    convidado: '',
    data: '2025-09-05',
    horario: '',
    local: '',
    endereco: '',
    descricao: '',
    video: expoVideo,
    capa: expoCapa,
    formato: 'horizontal', // vídeo deitado (16:9)
  },
];

// Data do evento à meia-noite no horário local (evita erro de fuso).
export const dataDoEvento = (ev) => new Date(`${ev.data}T00:00:00`);

const hoje = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

export const proximosEventos = () =>
  EVENTOS.filter((ev) => dataDoEvento(ev) >= hoje()).sort((a, b) => dataDoEvento(a) - dataDoEvento(b));

export const eventosRealizados = () =>
  EVENTOS.filter((ev) => dataDoEvento(ev) < hoje()).sort((a, b) => dataDoEvento(b) - dataDoEvento(a));

export const linkDoMapa = (endereco) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(endereco)}`;

export const mapaEmbutido = (endereco) =>
  `https://maps.google.com/maps?q=${encodeURIComponent(endereco)}&z=16&output=embed`;
