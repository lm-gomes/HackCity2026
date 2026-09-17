import { useMemo, useState } from "react";
import "./PatientDashboard.css";
import { MOCK_PACIENTE, MOCK_HISTORICO } from "./mockData";

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

function StatusBadge({ status }) {
  return (
    <span className={`pd-badge status-${status}`}>
      {STATUS_LABEL[status] || status}
    </span>
  );
}

function PrioridadeBadge({ prioridade }) {
  const cls = PRIORIDADE_CLASS[prioridade] || "";
  return <span className={`pd-badge ${cls}`}>{prioridade}</span>;
}

function PatientInfoCard({ paciente }) {
  const campos = [
    { label: "Nome", value: paciente.nome },
    { label: "Data de nascimento", value: formatarData(paciente.dataDeNascimento) },
    { label: "Telefone", value: paciente.telefone },
    { label: "Sexo", value: paciente.sexo },
    { label: "Endereço", value: paciente.endereco },
    { label: "CNS", value: paciente.cns },
  ];

  return (
    <div className="pd-card">
      <h2 className="pd-card-title">Dados do paciente</h2>
      <div className="pd-info-grid">
        {campos.map((campo) => (
          <div className="pd-info-item" key={campo.label}>
            <span className="pd-info-label">{campo.label}</span>
            <span className="pd-info-value">{campo.value || "-"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActionButtons({ onSelect }) {
  const acoes = [
    { key: "anamnese-psicopedagogica", label: "Anamnese Psicopedagógica" },
    { key: "anamnese-psicologica", label: "Anamnese Psicológica" },
    { key: "instrumental-ed-fisica", label: "Instrumental da Ed. Física" },
  ];

  return (
    <div className="pd-actions-row">
      {acoes.map((acao) => (
        <button
          key={acao.key}
          type="button"
          className="pd-action-btn"
          onClick={() => onSelect && onSelect(acao.key)}
        >
          {acao.label}
        </button>
      ))}
    </div>
  );
}

function HistoryCard({ registro }) {
  const campos = [
    { label: "Telefone", value: registro.telefone },
    { label: "Órgão", value: registro.orgao },
    { label: "Data", value: formatarData(registro.data) },
    { label: "Tipo (serviço prestado)", value: registro.tipo },
    { label: "Data de entrada", value: formatarData(registro.dataEntrada) },
  ];

  return (
    <div className={`pd-history-card status-${registro.status}`}>
      <div className="pd-history-top">
        <span className="pd-history-name">{registro.nomePaciente}</span>
        <div style={{ display: "flex", gap: 8 }}>
          <PrioridadeBadge prioridade={registro.prioridade} />
          <StatusBadge status={registro.status} />
        </div>
      </div>
      <div className="pd-history-grid">
        {campos.map((campo) => (
          <div className="pd-info-item" key={campo.label}>
            <span className="pd-info-label">{campo.label}</span>
            <span className="pd-info-value">{campo.value || "-"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PatientDashboard({
  paciente = MOCK_PACIENTE,
  historico = MOCK_HISTORICO,
  onSelectAction,
}) {
  const [statusFiltro, setStatusFiltro] = useState("todos");

  const historicoFiltrado = useMemo(() => {
    if (statusFiltro === "todos") return historico;
    return historico.filter((item) => item.status === statusFiltro);
  }, [historico, statusFiltro]);

  return (
    <div className="pd-root">
      <div className="pd-brandbar">
        <span className="pd-brand-mark">
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2v20M2 12h20" />
          </svg>
        </span>
        Sistema de Prontuários
      </div>

      <div className="pd-navbar">
        <span className="pd-navbar-title">Painel do paciente</span>
      </div>

      <div className="pd-content">
        <div className="pd-container">
          <PatientInfoCard paciente={paciente} />

          <ActionButtons onSelect={onSelectAction} />

          <div className="pd-section-header">
            <span className="pd-section-title">Histórico de atendimentos</span>
            <div className="pd-filter">
              <select
                value={statusFiltro}
                onChange={(e) => setStatusFiltro(e.target.value)}
              >
                <option value="todos">Todos os status</option>
                <option value="espera">Em espera</option>
                <option value="marcado">Marcado</option>
                <option value="atendido">Atendido</option>
                <option value="cancelado">Cancelado</option>
              </select>
            </div>
          </div>

          <div className="pd-history-list">
            {historicoFiltrado.length === 0 ? (
              <div className="pd-empty-state">Nenhum atendimento encontrado para esse filtro.</div>
            ) : (
              historicoFiltrado.map((registro) => (
                <HistoryCard registro={registro} key={registro.id} />
              ))
            )}
          </div>
        </div>
      </div>

      <div className="pd-footer">Sistema de Prontuários — uso interno</div>
    </div>
  );
}