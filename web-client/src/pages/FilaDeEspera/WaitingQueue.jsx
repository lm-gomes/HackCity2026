import { useMemo, useState } from "react";
import "./WaitingQueue.css";
import { MOCK_FILA } from "./mockFila";

const STATUS_LABEL = {
  espera: "Em espera",
  marcado: "Marcado",
  atendido: "Atendido",
  cancelado: "Cancelado",
};

const PRIORIDADE_CLASS = {
  Alta: "prioridade-alta",
  Média: "prioridade-media",
  Baixa: "prioridade-baixa",
};

function formatarData(isoDate) {
  if (!isoDate) return "-";
  const [ano, mes, dia] = isoDate.split("-");
  return `${dia}/${mes}/${ano}`;
}

function normalizar(texto) {
  return (texto || "")
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function StatusBadge({ status }) {
  return (
    <span className={`wq-badge status-${status}`}>
      {STATUS_LABEL[status] || status}
    </span>
  );
}

function PrioridadeBadge({ prioridade }) {
  const cls = PRIORIDADE_CLASS[prioridade] || "";
  return <span className={`wq-badge ${cls}`}>{prioridade}</span>;
}

function QueueCard({ registro }) {
  const campos = [
    { label: "Telefone", value: registro.telefone },
    { label: "Data", value: formatarData(registro.data) },
    { label: "Tipo (serviço prestado)", value: registro.tipo },
    { label: "Data de entrada", value: formatarData(registro.dataEntrada) },
  ];

  return (
    <div className={`wq-card status-${registro.status}`}>
      <div className="wq-card-top">
        <span className="wq-card-name">{registro.nomePaciente}</span>
        <div className="wq-card-badges">
          <PrioridadeBadge prioridade={registro.prioridade} />
          <StatusBadge status={registro.status} />
        </div>
      </div>
      <div className="wq-card-grid">
        {campos.map((campo) => (
          <div className="wq-info-item" key={campo.label}>
            <span className="wq-info-label">{campo.label}</span>
            <span className="wq-info-value">{campo.value || "-"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function WaitingQueue({ atendimentos = MOCK_FILA }) {
  const [busca, setBusca] = useState("");
  const [tipoFiltro, setTipoFiltro] = useState("todos");

  const tiposDisponiveis = useMemo(() => {
    const unicos = Array.from(new Set(atendimentos.map((a) => a.tipo)));
    return unicos;
  }, [atendimentos]);

  const listaFiltrada = useMemo(() => {
    const buscaNormalizada = normalizar(busca);
    return atendimentos.filter((registro) => {
      const nomeCombina = normalizar(registro.nomePaciente).includes(buscaNormalizada);
      const tipoCombina = tipoFiltro === "todos" || registro.tipo === tipoFiltro;
      return nomeCombina && tipoCombina;
    });
  }, [atendimentos, busca, tipoFiltro]);

  return (
    <div className="wq-root">
      <div className="wq-brandbar">
        <span className="wq-brand-mark">
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2v20M2 12h20" />
          </svg>
        </span>
        Sistema de Prontuários
      </div>

      <div className="wq-navbar">
        <span className="wq-navbar-title">Fila de espera</span>
      </div>

      <div className="wq-content">
        <div className="wq-container">
          <div className="wq-toolbar">
            <div className="wq-search">
              <label htmlFor="wq-busca-nome">Buscar por nome</label>
              <input
                id="wq-busca-nome"
                type="text"
                placeholder="Digite o nome do paciente"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>
            <div className="wq-filter">
              <label htmlFor="wq-filtro-tipo">Tipo de serviço</label>
              <select
                id="wq-filtro-tipo"
                value={tipoFiltro}
                onChange={(e) => setTipoFiltro(e.target.value)}
              >
                <option value="todos">Todos os tipos</option>
                {tiposDisponiveis.map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <span className="wq-results-count">
            {listaFiltrada.length} {listaFiltrada.length === 1 ? "atendimento encontrado" : "atendimentos encontrados"}
          </span>

          <div className="wq-list">
            {listaFiltrada.length === 0 ? (
              <div className="wq-empty-state">Nenhum atendimento encontrado para esse filtro.</div>
            ) : (
              listaFiltrada.map((registro) => <QueueCard registro={registro} key={registro.id} />)
            )}
          </div>
        </div>
      </div>

      <div className="wq-footer">Sistema de Prontuários — uso interno</div>
    </div>
  );
}