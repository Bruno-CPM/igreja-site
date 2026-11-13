import { useEffect, useState } from 'react';
import Reveal from '../components/Reveal';
import { getPregadores } from '../services/api';
import fotoEduardo from '../assets/pregador-foto-1.jpg';
import fotoAndre from '../assets/pregador-foto-2.jpg';
import fotoIsabella from '../assets/pregador-foto-3.jpg';
import fotoAlfredo from '../assets/pregador-foto-4.jpg';
import fotoDeuzenir from '../assets/pregador-foto-5.jpg';
import fotoAndrea from '../assets/pregador-foto-6.jpg';
import fotoEduardoLeite from '../assets/pregador-foto-7.jpg';
import heroPregadores from '../assets/hero-pregadores.jpeg';
import './PageShared.css';

// Pregadores com foto fixa no site. Para incluir outro, adicione um item aqui.
// "sobre" (opcional): parágrafos que aparecem no verso da foto ao passar o mouse.
const PREGADORES_FIXOS = [
  {
    id: 'local-eduardo',
    nome: 'Bispo Eduardo Campos',
    fotoUrl: fotoEduardo,
    sobre: [
      'Eduardo Campos é bispo na igreja Vínculo da Paz e dedica-se ao ministério há 29 anos. É casado há 27 anos com Deuzenir Campos, com quem tem dois filhos, Isabella e Calebe, e atribui toda a sua trajetória ao favor imerecido: a graça do Senhor Jesus.',
      'Ele crê que Deus o tem chamado a trabalhar com o corpo de Cristo, a Igreja. Reconhece que, em alguns aspectos, a Igreja se encontra fragmentada, com pessoas buscando seus próprios interesses, mas acredita que o Espírito Santo continua agindo por meio de um remanescente fiel para que a obra de Deus siga adiante.',
    ],
  },
  {
    id: 'local-deuzenir',
    nome: 'Bispa Deuzenir Campos',
    fotoUrl: fotoDeuzenir,
    sobre: [
      'Deuzenir Campos é bispa na Comunidade Vínculo da Paz, casada com Eduardo Campos, pastor sênior da Comunidade Vínculo da Paz. Mãe de Isabella Eduarda e Calebe Henrique, ela tem na família seu ministério mais precioso.',
      'Sua trajetória de fé começou em janeiro de 1996, quando entregou sua vida a Jesus Cristo e se tornou a primeira geração cristã de sua família. Sua conversão foi um marco divino, e Deus usou sua vida como canal de transformação: por meio dela, seus pais, seus cinco irmãos e seus sobrinhos foram conduzidos ao conhecimento de Cristo.',
      'No ministério, a Bispa Deuzenir atua com zelo e unção nas áreas de intercessão, aconselhamento e libertação familiar, servindo à Igreja com dedicação integral e um coração pastoral.',
      'Hoje, ela é um exemplo de fé inabalável, perseverança e serviço dedicado à expansão do Reino de Deus.',
    ],
  },
  {
    id: 'local-andre',
    nome: 'Pastor Andre Quelhas',
    fotoUrl: fotoAndre,
    sobre: [
      'André Quelhas é pastor na igreja Vínculo da Paz, compositor e diretor musical. Tem 26 anos e é casado há 3 anos com Isabella Quelhas. Há 6 anos, o casal lidera junto os ministérios de louvor e arte da igreja, e André também atua no discipulado de jovens.',
      'Sua missão é conduzir uma igreja e uma geração a adorar Jesus em espírito e em verdade, por meio da adoração em todas as suas expressões.',
    ],
  },
  { id: 'local-isabela', nome: 'Pastora Isabella Quelhas', fotoUrl: fotoIsabella },
  {
    id: 'local-alfredo',
    nome: 'Pastor Alfredo Fujiwara',
    fotoUrl: fotoAlfredo,
    sobre: [
      'Alfredo Fujiwara é pastor na igreja Vínculo da Paz, casado há 20 anos com a bispa Andrea Fujiwara, e dedica-se ao ministério há 21 anos.',
      'O que mais o apaixona em Jesus é o Seu amor incondicional, como diz Romanos 5:8: “Mas Deus prova o seu amor para conosco, em que Cristo morreu por nós, sendo nós ainda pecadores.”',
      'Neste tempo, Deus tem falado ao seu coração que Jesus Cristo é o mesmo ontem, hoje e eternamente (Hebreus 13:8).',
      'Sobre a Igreja no mundo hoje, ele acredita que é preciso deixar Jesus Cristo ser o centro e compreender que Ele é suficiente.',
    ],
  },
  {
    id: 'local-andrea',
    nome: 'Bispa Andrea Fujiwara',
    fotoUrl: fotoAndrea,
    sobre: [
      'Andrea Fujiwara é bispa e está casada há 20 anos com o pastor Alfredo Fujiwara. Serve no Reino desde 1995 e pastoreia desde 2002.',
      'O que mais a apaixona em Jesus é o Seu amor pela humanidade e a certeza de poder desfrutar de Sua amável companhia em todos os momentos e situações.',
      'Ela crê que Deus continua comunicando Sua graça salvadora, porque a mensagem da cruz não mudou. É isso que a leva a olhar para os campos que já estão brancos para a colheita e para as almas que clamam, indo ao encontro do desejo do coração do Amado: que ninguém se perca.',
      'Para Andrea, a Igreja de Cristo é a Sua noiva, e a noiva é intocável. Ela entende que a Igreja precisa de um alinhamento com os céus, mas segue firme na visão e no amadurecimento. Acredita que, de forma geral, a Igreja precisa voltar a ter Cristo no centro e abandonar práticas humanistas.',
    ],
  },
  {
    id: 'local-eduardo-leite',
    nome: 'Pastor Eduardo Leite',
    fotoUrl: fotoEduardoLeite,
    sobre: [
      'Eduardo Leite é pastor na igreja Vínculo da Paz, tem 49 anos e é casado há 17 anos com Simone Rodrigues. Conheceu a Cristo em 1996, em uma reunião dos Atletas de Cristo no Rio de Janeiro, o início de uma caminhada marcada pela graça. Em 1999, afastou-se dos caminhos do Senhor, mas a graça o alcançou novamente e, em 2007, ele retornou. Desde então, vive para servir Àquele que nunca desistiu dele.',
      'O que mais o apaixona em Cristo é o Seu amor incondicional, que age com justiça e verdade; afinal, Ele é a própria Verdade. Sua visão sobre a Igreja no mundo hoje é a mesma que a Bíblia apresenta: ela é viva e poderosa. Ainda que muitos não a vejam, ela está lá, e só precisa despertar.',
    ],
  },
];

// Biografias maiores usam letra um pouco menor para caber na foto sem rolagem.
function tamanhoBio(sobre) {
  const n = sobre.join(' ').length + sobre.length * 60; // cada parágrafo extra também ocupa espaço
  if (n > 1050) return ' preacher-flip__verso--muito-longo';
  if (n > 780) return ' preacher-flip__verso--longo';
  return '';
}

// Foto que vira ao passar o mouse (ou ao tocar, no celular) e mostra o "sobre" no verso.
function FotoComSobre({ p }) {
  const [virada, setVirada] = useState(false);
  return (
    <div
      className={`preacher-flip${virada ? ' is-virada' : ''}`}
      role="button"
      tabIndex={0}
      aria-pressed={virada}
      aria-label={`Sobre ${p.nome}`}
      onClick={() => setVirada((v) => !v)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setVirada((v) => !v); }
      }}
    >
      <div className="preacher-flip__inner">
        <div className="preacher-flip__face preacher-card__img preacher-card__img--foto">
          <img src={p.fotoUrl} alt={p.nome} />
          <span className="preacher-flip__dica">Sobre</span>
        </div>
        <div className={`preacher-flip__face preacher-flip__verso${tamanhoBio(p.sobre)}`}>
          <span className="eyebrow">Sobre</span>
          <h4>{p.nome}</h4>
          {p.sobre.map((par, i) => <p key={i}>{par}</p>)}
        </div>
      </div>
    </div>
  );
}

function iniciais(nome = '') {
  return nome.split(' ').filter(Boolean).slice(0, 2).map((n) => n[0]).join('').toUpperCase();
}

export default function Pregadores() {
  const [pregadores, setPregadores] = useState(PREGADORES_FIXOS);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    getPregadores()
      .then((daApi) => {
        const nomesFixos = PREGADORES_FIXOS.map((p) => p.nome.toLowerCase());
        setPregadores([...PREGADORES_FIXOS, ...daApi.filter((p) => !nomesFixos.includes((p.nome || '').toLowerCase()))]);
      })
      .catch(() => setErro(true))
      .finally(() => setCarregando(false));
  }, []);

  return (
    <>
      <section className="page-hero page-hero--photo" style={{ backgroundImage: `url(${heroPregadores})` }}>
        <div className="container">
          <Reveal>
            <span className="eyebrow">Quem prega entre nós</span>
            <h1>Pregadores</h1>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <p className="page-intro">Conheça os pastores e ministros que compartilham a Palavra em nossa igreja</p>
          </Reveal>
        </div>
        <div className="container">
          {carregando && <p className="placeholder-note">Carregando pregadores...</p>}
          {erro && pregadores.length === 0 && <p className="placeholder-note">Não foi possível carregar os pregadores agora.</p>}
          {!carregando && !erro && pregadores.length === 0 && (
            <div className="empty-state"><p>Nenhum pregador cadastrado ainda.</p></div>
          )}

          <div className="grid-3">
            {pregadores.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 90}>
                <div className="card preacher-card">
                  {p.fotoUrl && p.sobre ? (
                    <FotoComSobre p={p} />
                  ) : (
                    <div className={`preacher-card__img${p.fotoUrl ? ' preacher-card__img--foto' : ''}`}>
                      {p.fotoUrl ? <img src={p.fotoUrl} alt={p.nome} /> : <span>{iniciais(p.nome)}</span>}
                    </div>
                  )}
                  <div className="preacher-card__body">
                    <h3>{p.nome}</h3>
                    {p.cargo && <span className="tag">{p.cargo}</span>}
                    {p.biografia && <p>{p.biografia}</p>}
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
