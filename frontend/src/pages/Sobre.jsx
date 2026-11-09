import Reveal from '../components/Reveal';
import heroSobre from '../assets/hero-sobre.jpeg';
import './PageShared.css';
import fachadaAntiga from '../assets/igreja-fachada-antiga.jpg';
import cultoAntigo from '../assets/igreja-culto-antigo.jpg';

const VALORES = [
  { titulo: 'Fé', texto: '[texto a ser fornecido]' },
  { titulo: 'Família', texto: '[texto a ser fornecido]' },
  { titulo: 'Comunidade', texto: '[texto a ser fornecido]' },
  { titulo: 'Serviço', texto: '[texto a ser fornecido]' },
];

export default function Sobre() {
  return (
    <>
      <section className="page-hero page-hero--photo" style={{ backgroundImage: `url(${heroSobre})` }}>
        <div className="container">
          <Reveal>
            <span className="eyebrow">Quem somos</span>
            <h1>Sobre a igreja</h1>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container two-col">
          <Reveal>
            <h2>Nossa missão</h2>
            <p>
              Ser uma comunidade em Samambaia onde pessoas diferentes vivem como um só corpo em
              Cristo, preservando a unidade do Espírito pelo vínculo da paz.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2>Nossa visão</h2>
            <p>
              Firmados em Efésios 4.1–6, nossa visão é uma igreja unida — um só corpo, um só Espírito
              e uma só fé —, onde a comunhão vem antes das diferenças. Desejamos servir uns aos outros com humildade e mansidão, sem buscar posição,
              e suportar uns aos outros em amor, com paciência, acolhendo cada pessoa no seu
              processo. Buscamos uma vida de igreja vivida em família, não apenas no culto de
              domingo, e uma fé que se traduz em caráter e prática diária: uma vida digna do chamado
              que recebemos.
            </p>
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
          <Reveal className="church-photos">
            <img src={fachadaAntiga} alt="Fachada antiga da igreja Vínculo da Paz" />
            <img src={cultoAntigo} alt="Culto de louvor na igreja Vínculo da Paz" />
          </Reveal>
          <Reveal delay={100}>
            <span className="eyebrow">Nossa história</span>
            <h2>De onde viemos</h2>
            <p>
              {"A Comunidade Cristã Apostólica Vínculo da Paz foi fundada em 18 de outubro de 2006. Naquela ocasião, a congregação tinha outro nome — 3ª IEPSA —, pois fazia parte de outra missão e de outros valores."}
            </p>
            <p>
              {"Em 2008, Deus deu aos bispos Eduardo Nascimento Campos e Deuzenir Silva Nascimento Campos a direção para institucionalizar a CCAVP — Comunidade Cristã Apostólica Vínculo da Paz —, agora com a missão de atuar como corpo de Cristo, com base em Efésios 4:3: 'conservando a unidade do Espírito pelo vínculo da paz'."}
            </p>
            <p>
              {"Os bispos, por sua vez, levaram esse chamado de Deus aos seus antigos líderes, que prontamente marcaram uma reunião com todos os membros da antiga congregação local para saber qual seria a decisão deles também. Unanimemente, todos optaram por seguir seus pastores, os bispos Eduardo e Deuzenir."}
            </p>
            <p>
              {"A liderança da IEPSA Sede, em conjunto com a decisão da congregação, teve uma atitude de lucidez e sabedoria ao nos abençoar e nos deixar ir, para seguirmos a direção que Deus havia nos dado."}
            </p>
            <p>
              {"Hoje, a Comunidade Cristã Apostólica Vínculo da Paz considera-se fundada no dia da sua instituição — 18 de outubro de 2006 — e abençoada para seguir o chamado de Deus no mês de abril de 2008."}
            </p>
            <h3 className="history-subtitle">Identidade e doutrina</h3>
            <p>
              {"Inspirada em Efésios 4, que exorta a preservar “a unidade do Espírito pelo vínculo da paz”, a Vínculo da Paz é uma igreja cristã apostólica que segue a doutrina dos Apóstolos. Tem a Bíblia Sagrada como regra de fé, Jesus Cristo como único e suficiente Senhor e Salvador e o Espírito Santo como selo de Deus, consolador e mestre. Sua ênfase está no ensino bíblico, na adoração, na unidade entre os irmãos e na pregação da graça de Cristo."}
            </p>
            <h3 className="history-subtitle">Atuação hoje</h3>
            <p>
              {"A vida da comunidade gira em torno dos cultos de domingo, às 18h, com transmissão ao vivo das pregações. A igreja também realiza conferências de adoração ao longo do ano e participa de ações sociais e culturais em Samambaia, atenta às necessidades da comunidade local."}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
