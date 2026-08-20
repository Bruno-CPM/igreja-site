import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <div className="footer__brand">Igreja<em>Comunidade</em></div>
          <p className="footer__text">
            Um lugar para celebrar a fé, fortalecer a família e servir a comunidade.
          </p>
          <p className="placeholder-note">[Logotipo e texto institucional a serem fornecidos]</p>
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
            <li><a href="#" aria-label="Instagram">Instagram</a></li>
            <li><a href="#" aria-label="YouTube">YouTube</a></li>
            <li><a href="#" aria-label="Facebook">Facebook</a></li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom container">
        <span>© {new Date().getFullYear()} Igreja Comunidade. Todos os direitos reservados.</span>
      </div>
    </footer>
  );
}
