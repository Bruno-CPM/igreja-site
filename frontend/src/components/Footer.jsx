import { Link } from 'react-router-dom';
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
          <h4>Navegação</h4>
          <ul className="footer__list">
            <li><Link to="/sobre">Sobre a igreja</Link></li>
            <li><Link to="/servicos">Serviços</Link></li>
            <li><Link to="/eventos">Eventos</Link></li>
            <li><Link to="/pregacoes">Pregações</Link></li>
            <li><Link to="/pregadores">Pregadores</Link></li>
          </ul>
        </div>

        <div>
          <h4>Contato</h4>
          <ul className="footer__list">
            <li>Endereço: [a definir]</li>
            <li>Telefone: [a definir]</li>
            <li>E-mail: [a definir]</li>
          </ul>
        </div>

        <div>
          <h4>Redes sociais</h4>
          <ul className="footer__list">
           <li><a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">Instagram</a></li>
           <li><a href="https://www.youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">YouTube</a></li>
           <li><a href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">Facebook</a></li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom container">
        <span>© {new Date().getFullYear()} Igreja Comunidade. Todos os direitos reservados.</span>
      </div>
    </footer>
  );
}
