import logo from '../assets/logo-vinculo-da-paz.png';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <img src={logo} alt="Vínculo da Paz" className="footer__logo" />
          <p className="footer__text">
            Conservando a unidade do Espirito pelo Vinculo da Paz
          </p>
        </div>

        <div>
          <h4>Contato</h4>
          <ul className="footer__list">
            <li>Endereço: QS 304, Conjunto 2, Lote 8, Samambaia, Brasília - DF</li>
            <li>Telefone: (61) 99967-4458</li>
            <li>E-mail: ccvinculodapazdml@gmail.com</li>
          </ul>
        </div>

        <div>
          <h4>Redes sociais</h4>
          <ul className="footer__list">
           <li><a href="https://www.instagram.com/vinculodapaz/" target="_blank" rel="noreferrer" aria-label="Instagram">Instagram</a></li>
           <li><a href="https://www.youtube.com/@vinculodapaz" target="_blank" rel="noreferrer" aria-label="YouTube">YouTube</a></li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom container">
        <span>© {new Date().getFullYear()} Igreja Comunidade. Todos os direitos reservados.</span>
      </div>
    </footer>
  );
}
