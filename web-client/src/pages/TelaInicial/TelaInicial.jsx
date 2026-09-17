import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TelaInicial.css";

const cards = [
  {
    id: "cadastrar-paciente",
    label: "Cadastrar Paciente",
    path: "/cadastrar-paciente",
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <rect x="10" y="6" width="28" height="36" rx="4" stroke="currentColor" strokeWidth="2.2" />
        <circle cx="24" cy="19" r="5" stroke="currentColor" strokeWidth="2.2" />
        <path d="M15 33c1.8-4.2 5.2-6.3 9-6.3s7.2 2.1 9 6.3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
  id: "filas-atendimento",
  label: "Filas de Atendimentos",
  path: "/filas-atendimento",
  icon: (
    <svg viewBox="0 0 48 48" fill="none">
      <circle cx="14" cy="15" r="4.5" stroke="currentColor" strokeWidth="2.2" />
      <path d="M6 35c1.5-5.5 4.8-8 8-8s6.5 2.5 8 8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="33" cy="15" r="4.5" stroke="currentColor" strokeWidth="2.2" />
      <path d="M25 35c1.5-5.5 4.8-8 8-8s6.5 2.5 8 8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
    ),
  },
  {
    id: "solicitar-atendimento",
    label: "Solicitar Atendimento",
    path: "/solicitar-atendimento",
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <rect x="7" y="6" width="24" height="32" rx="3" stroke="currentColor" strokeWidth="2.2" />
        <line x1="13" y1="15" x2="25" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="13" y1="21" x2="25" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="13" y1="27" x2="20" y2="27" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="34" cy="34" r="9" fill="var(--elo-surface)" stroke="currentColor" strokeWidth="2.2" />
        <line x1="34" y1="29.5" x2="34" y2="38.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="29.5" y1="34" x2="38.5" y2="34" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "meus-atendimentos",
    label: "Meus Atendimentos",
    path: "/meus-atendimentos",
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <path d="M12 8h20a3 3 0 0 1 3 3v27l-13-6-13 6V11a3 3 0 0 1 3-3Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
        <circle cx="33" cy="33" r="9" fill="var(--elo-surface)" stroke="currentColor" strokeWidth="2.2" />
        <line x1="33" y1="28.5" x2="33" y2="37.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="28.5" y1="33" x2="37.5" y2="33" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function TelaInicial({ instituicoes = "Nomes de Instituições" }) {
  const navigate = useNavigate();

  function handleSair() {
    navigate("/");
  }

  return (
    <div className="ti-shell">
      <header className="ti-brandbar">
        <span className="ti-brand-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
            <circle cx="8" cy="12" r="3" />
            <circle cx="16" cy="12" r="3" />
            <path d="M11 12h2" />
          </svg>
        </span>
        Logos/Nome do sistema
      </header>

      <nav className="ti-navbar">
        <span className="ti-navbar-title">Início</span>
        <div className="ti-navbar-actions">
          <button type="button" className="ti-sair" onClick={handleSair}>
            Sair
          </button>
          <span className="ti-avatar" aria-hidden="true" />
        </div>
      </nav>

      <main className="ti-content">
        <div className="ti-grid">
          {cards.map((card) => (
            <button
              key={card.id}
              type="button"
              className="ti-card"
              onClick={() => navigate(card.path)}
            >
              <span className="ti-card-icon">{card.icon}</span>
              <span className="ti-card-label">{card.label}</span>
            </button>
          ))}
        </div>
      </main>

      <footer className="ti-footer">{instituicoes}</footer>
    </div>
  );
}