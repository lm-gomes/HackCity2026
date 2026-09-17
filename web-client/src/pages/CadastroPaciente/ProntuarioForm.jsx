import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProntuarioForm.css";

const REQUIRED_FIELDS = ["dataDaAbertura", "nome", "dataDeNascimento"];

const INITIAL_STATE = {
  numeroProntuario: "",
  hipoteseDiagnostica: "",
  dataDaAbertura: "",
  nome: "",
  cns: "",
  dataDeNascimento: "",
  nomeDaMae: "",
  telefone: "",
  sexo: "",
  cor: "",
  endereco: "",
  unidadeDeReferencia: "",
  nomeResponsavel: "",
  cnsDoResponsavel: "",
  dataDeNascimentoResponsavel: "",
};

function Field({ id, label, required, error, children }) {
  return (
    <div className="pf-field">
      <label htmlFor={id}>
        {label} {required && <span className="pf-req">*</span>}
      </label>
      {children}
      <div className="pf-field-error">{error || ""}</div>
    </div>
  );
}

export default function ProntuarioForm({ onSubmit }) {
  const navigate = useNavigate();
  const [values, setValues] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }

  function handleClear() {
    setValues(INITIAL_STATE);
    setErrors({});
    setSaved(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaved(false);

    const nextErrors = {};
    REQUIRED_FIELDS.forEach((name) => {
      if (!values[name]) {
        nextErrors[name] = "Campo obrigatório";
      }
    });

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const payload = {
      ...values,
      numeroProntuario: values.numeroProntuario ? Number(values.numeroProntuario) : null,
    };

    try {
      const res = await fetch("http://localhost:8080/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.text();

      if (!res.ok) {
        throw new Error(data);
      }

      if (onSubmit) {
        onSubmit(data);
      }

      if (res.ok){
        alert("Cadastro realizado com sucesso!");
        navigate("/Inicial");
      }


    if (onSubmit) {
      onSubmit(payload);
    } else {
      console.log("Prontuário salvo:", payload);
    }
    setSaved(true);

  }
  catch (err) {
      setErrors((prev) => ({
        ...prev,
        senha: "Não foi possível entrar. Verifique os dados e tente novamente.",
      }));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pf-root">
      <div className="pf-brandbar">
        <span className="pf-brand-mark">
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2v20M2 12h20" />
          </svg>
        </span>
        Sistema de Prontuários
      </div>

      <div className="pf-navbar">
        <span className="pf-navbar-title">Cadastro de Prontuário</span>
      </div>

      <div className="pf-content">
        <form className="pf-card" onSubmit={handleSubmit} noValidate>
          <h1 className="pf-title">Novo Prontuário</h1>
          <p className="pf-subtitle">Preencha os dados abaixo para abrir o prontuário do paciente.</p>

          {saved && <div className="pf-success-banner">Prontuário salvo com sucesso.</div>}

          <div className="pf-section-title first">Dados do prontuário</div>
          <div className="pf-grid">
            {/* <Field id="numeroProntuario" label="Número do prontuário" required error={errors.numeroProntuario}>
              <input
                type="number"
                id="numeroProntuario"
                name="numeroProntuario"
                placeholder="Ex.: 100234"
                value={values.numeroProntuario}
                onChange={handleChange}
                className={errors.numeroProntuario ? "invalid" : ""}
              />
            </Field> */}
            <Field id="dataDaAbertura" label="Data de abertura" required error={errors.dataDaAbertura}>
              <input
                type="date"
                id="dataDaAbertura"
                name="dataDaAbertura"
                value={values.dataDaAbertura}
                onChange={handleChange}
                className={errors.dataDaAbertura ? "invalid" : ""}
              />
            </Field>
            <div className="pf-field-full">
              <Field id="hipoteseDiagnostica" label="Hipótese diagnóstica">
                <input
                  type="text"
                  id="hipoteseDiagnostica"
                  name="hipoteseDiagnostica"
                  placeholder="Ex.: Hipertensão arterial"
                  value={values.hipoteseDiagnostica}
                  onChange={handleChange}
                />
              </Field>
            </div>
            <div className="pf-field-full">
              <Field id="unidadeDeReferencia" label="Unidade de referência">
                <input
                  type="text"
                  id="unidadeDeReferencia"
                  name="unidadeDeReferencia"
                  placeholder="Nome da unidade de saúde"
                  value={values.unidadeDeReferencia}
                  onChange={handleChange}
                />
              </Field>
            </div>
          </div>

          <div className="pf-section-title">Dados do paciente</div>
          <div className="pf-grid">
            <div className="pf-field-full">
              <Field id="nome" label="Nome" required error={errors.nome}>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  placeholder="Nome completo do paciente"
                  value={values.nome}
                  onChange={handleChange}
                  className={errors.nome ? "invalid" : ""}
                />
              </Field>
            </div>
            <Field id="cns" label="CNS">
              <input
                type="text"
                id="cns"
                name="cns"
                placeholder="Cartão Nacional de Saúde"
                inputMode="numeric"
                maxLength={15}
                value={values.cns}
                onChange={handleChange}
              />
            </Field>
            <Field id="dataDeNascimento" label="Data de nascimento" required error={errors.dataDeNascimento}>
              <input
                type="date"
                id="dataDeNascimento"
                name="dataDeNascimento"
                value={values.dataDeNascimento}
                onChange={handleChange}
                className={errors.dataDeNascimento ? "invalid" : ""}
              />
            </Field>
            <Field id="sexo" label="Sexo">
              <select id="sexo" name="sexo" value={values.sexo} onChange={handleChange}>
                <option value="">Selecione</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
              </select>
            </Field>
            <Field id="cor" label="Cor/Raça">
              <select id="cor" name="cor" value={values.cor} onChange={handleChange}>
                <option value="">Selecione</option>
                <option value="Branca">Branca</option>
                <option value="Preta">Preta</option>
                <option value="Parda">Parda</option>
                <option value="Amarela">Amarela</option>
                <option value="Indígena">Indígena</option>
              </select>
            </Field>
            <Field id="telefone" label="Telefone">
              <input
                type="tel"
                id="telefone"
                name="telefone"
                placeholder="(00) 00000-0000"
                value={values.telefone}
                onChange={handleChange}
              />
            </Field>
            <Field id="nomeDaMae" label="Nome da mãe">
              <input
                type="text"
                id="nomeDaMae"
                name="nomeDaMae"
                placeholder="Nome completo da mãe"
                value={values.nomeDaMae}
                onChange={handleChange}
              />
            </Field>
            <div className="pf-field-full">
              <Field id="endereco" label="Endereço">
                <input
                  type="text"
                  id="endereco"
                  name="endereco"
                  placeholder="Rua, número, bairro, cidade"
                  value={values.endereco}
                  onChange={handleChange}
                />
              </Field>
            </div>
          </div>

          <div className="pf-section-title">Responsável (se aplicável)</div>
          <div className="pf-grid">
            <div className="pf-field-full">
              <Field id="nomeResponsavel" label="Nome do responsável">
                <input
                  type="text"
                  id="nomeResponsavel"
                  name="nomeResponsavel"
                  placeholder="Nome completo do responsável"
                  value={values.nomeResponsavel}
                  onChange={handleChange}
                />
              </Field>
            </div>
            <Field id="cnsDoResponsavel" label="CNS do responsável">
              <input
                type="text"
                id="cnsDoResponsavel"
                name="cnsDoResponsavel"
                placeholder="Cartão Nacional de Saúde"
                inputMode="numeric"
                maxLength={15}
                value={values.cnsDoResponsavel}
                onChange={handleChange}
              />
            </Field>
            <Field id="dataDeNascimentoResponsavel" label="Data de nascimento do responsável">
              <input
                type="date"
                id="dataDeNascimentoResponsavel"
                name="dataDeNascimentoResponsavel"
                value={values.dataDeNascimentoResponsavel}
                onChange={handleChange}
              />
            </Field>
          </div>

          <div className="pf-actions">
            <button type="button" className="pf-btn pf-btn-secondary" onClick={handleClear}>
              Limpar
            </button>
            <button type="submit" className="pf-btn pf-btn-primary">
              Cadastrar paciente
            </button>
          </div>
        </form>
      </div>

      <div className="pf-footer">Sistema de Prontuários — uso interno</div>
    </div>
  );
}