import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SolicitarAgendamento.css";

// Mock de solicitações já existentes com status "em espera".
// Em produção isso viria da API/backend.
const SOLICITACOES_EM_ESPERA = [
  { cns: "70123456789 0123", servico: "Anamnese Psicológica" },
];

const SERVICOS = [
  "Anamnese Psicológica",
  "Instrumental da Ed. Física",
  "Anamnese Psicopedagógica",
];

function normalizarCns(valor) {
  return valor.replace(/\s/g, "");
}

export default function SolicitarAgendamento() {
  const navigate = useNavigate();

  const [cns, setCns] = useState("");
  const [nome, setNome] = useState("");
  const [queixa, setQueixa] = useState("");
  const [servico, setServico] = useState("");
  const [alerta, setAlerta] = useState(null);
  const [erros, setErros] = useState({});

  function possuiConflito(cnsValor, servicoValor) {
    if (!cnsValor || !servicoValor) return false;
    const cnsNormalizado = normalizarCns(cnsValor);
    return SOLICITACOES_EM_ESPERA.some(
      (s) =>
        normalizarCns(s.cns) === cnsNormalizado && s.servico === servicoValor
    );
  }

  function handleServicoChange(e) {
    const novoServico = e.target.value;

    if (possuiConflito(cns, novoServico)) {
      setAlerta(
        `Já existe uma solicitação de "${novoServico}" em espera para este CNS. Não é possível solicitar outro atendimento do mesmo tipo até que o anterior seja concluído.`
      );
      return; // impede a seleção
    }

    setAlerta(null);
    setServico(novoServico);
  }

  function handleCnsChange(e) {
    const valor = e.target.value;
    setCns(valor);

    // Se o CNS mudar e ainda houver conflito com o serviço já selecionado,
    // avisa e limpa a seleção.
    if (servico && possuiConflito(valor, servico)) {
      setAlerta(
        `Já existe uma solicitação de "${servico}" em espera para este CNS. Selecione outro serviço.`
      );
      setServico("");
    }
  }

  function validar() {
    const novosErros = {};
    if (!cns.trim()) novosErros.cns = "Informe o CNS.";
    if (!nome.trim()) novosErros.nome = "Informe o nome completo.";
    if (!servico) novosErros.servico = "Selecione um serviço.";
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (possuiConflito(cns, servico)) {
      setAlerta(
        `Não é possível concluir: já existe uma solicitação de "${servico}" em espera para este CNS.`
      );
      return;
    }

    if (!validar()) return;

    // Aqui entraria a chamada real de envio da solicitação.
    console.log("Solicitação enviada:", { cns, nome, queixa, servico });
    navigate("/meus-atendimentos");
  }

  return (
    <div className="sa-page">
      <div className="sa-card">
        <h1 className="sa-title">Solicitar Atendimento</h1>
        <p className="sa-subtitle">
          Preencha os dados abaixo para solicitar um novo atendimento.
        </p>

        {alerta && (
          <div className="sa-alert" role="alert">
            <span className="sa-alert-icon" aria-hidden="true">
              !
            </span>
            <span>{alerta}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <h2 className="sa-section">Dados do paciente</h2>

          <div className="sa-field">
            <label htmlFor="cns" className="sa-label">
              CNS (Cartão Nacional de Saúde) <span className="sa-required">*</span>
            </label>
            <input
              id="cns"
              type="text"
              className="sa-input"
              placeholder="000 0000 0000 0000"
              value={cns}
              onChange={handleCnsChange}
            />
            {erros.cns && <span className="sa-error">{erros.cns}</span>}
          </div>

          <div className="sa-field">
            <label htmlFor="nome" className="sa-label">
              Nome completo <span className="sa-required">*</span>
            </label>
            <input
              id="nome"
              type="text"
              className="sa-input"
              placeholder="Nome completo do paciente"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            {erros.nome && <span className="sa-error">{erros.nome}</span>}
          </div>

          <h2 className="sa-section">Dados do atendimento</h2>

          <div className="sa-field">
            <label htmlFor="queixa" className="sa-label">
              Queixa
            </label>
            <textarea
              id="queixa"
              className="sa-textarea"
              placeholder="Descreva a queixa do paciente"
              value={queixa}
              onChange={(e) => setQueixa(e.target.value)}
              rows={4}
            />
          </div>

          <div className="sa-field">
            <label htmlFor="servico" className="sa-label">
              Serviço <span className="sa-required">*</span>
            </label>
            <select
              id="servico"
              className="sa-select"
              value={servico}
              onChange={handleServicoChange}
            >
              <option value="" disabled>
                Selecione um serviço
              </option>
              {SERVICOS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {erros.servico && <span className="sa-error">{erros.servico}</span>}
          </div>

          <div className="sa-actions">
            <button
              type="button"
              className="sa-btn sa-btn-secondary"
              onClick={() => navigate(-1)}
            >
              Cancelar
            </button>
            <button type="submit" className="sa-btn sa-btn-primary">
              Solicitar Atendimento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}