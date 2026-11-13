import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Eventos from './pages/Eventos';
import Pregacoes from './pages/Pregacoes';
import Pregadores from './pages/Pregadores';
import Contribuicao from './pages/Contribuicao';
import Contato from './pages/Contato';
import Inscritos from './pages/Inscritos';
import './App.css';

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          {/* A página Serviços foi removida; links antigos vão para a página inicial */}
          <Route path="/servicos" element={<Navigate to="/" replace />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/pregacoes" element={<Pregacoes />} />
          <Route path="/pregadores" element={<Pregadores />} />
          <Route path="/contribuicao" element={<Contribuicao />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/inscritos" element={<Inscritos />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
