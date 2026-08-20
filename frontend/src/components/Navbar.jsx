import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';

const LINKS = [
  { to: '/', label: 'Início', end: true },
  { to: '/sobre', label: 'Sobre' },
  { to: '/servicos', label: 'Serviços' },
  { to: '/eventos', label: 'Eventos' },
  { to: '/pregacoes', label: 'Pregações' },
  { to: '/pregadores', label: 'Pregadores' },
  { to: '/contato', label: 'Contato' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <NavLink to="/" className="navbar__brand">
          <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true">
            <path d="M15 2 C6 2 6 12 6 12 V27 H24 V12 C24 12 24 2 15 2 Z" fill="none" stroke="currentColor" strokeWidth="2" />
            <line x1="15" y1="2" x2="15" y2="27" stroke="currentColor" strokeWidth="1.4" opacity="0.6" />
          </svg>
          <span>Igreja<em>Comunidade</em></span>
        </NavLink>

        <nav className={`navbar__links ${open ? 'is-open' : ''}`}>
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => `navbar__link ${isActive ? 'is-active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button
          className={`navbar__toggle ${open ? 'is-open' : ''}`}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
