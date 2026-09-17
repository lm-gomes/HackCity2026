import { useState } from "react";
import "./Login.css";

function validEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export default function Login({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({ email: "", senha: "" });
  const [jsonPreview, setJsonPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const nextErrors = { email: "", senha: "" };
    let ok = true;

    if (!validEmail(email)) {
      nextErrors.email = "Informe um e-mail válido.";
      ok = false;
    }
    if (senha.length < 1) {
      nextErrors.senha = "Informe sua senha.";
      ok = false;
    }

    setErrors(nextErrors);

    if (!ok) {
      setJsonPreview(null);
      return;
    }

    const payload = { email: email.trim(), senha };

    setJsonPreview({
      data: payload,
      time: new Date().toLocaleTimeString("pt-BR"),
    });

    setLoading(true);
    try {
      const res = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Erro ${res.status}`);
      }

      const data = await res.json();
      // redirecionar, salvar token, etc.
      if (onSubmit) onSubmit(data);
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        senha: "Não foi possível entrar. Verifique os dados e tente novamente.",
      }));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="elo-shell">
      {/* LEFT: brand / context */}
      <div className="elo-brand">
        <div>
          <div className="elo-brand-copy">
            <h1>Um só histórico. Todos os órgãos.</h1>
            <p>O sistema integrado vai garantir que seus dados sejam unificados!</p>
          </div>
        </div>

        <div className="elo-brand-foot">
          <span>Acesso restrito a servidores públicos autorizados</span>
          <span>v1.0</span>
        </div>
      </div>

      {/* RIGHT: login form */}
      <div className="elo-panel">
        <div className="elo-card">
          <h2>Entrar</h2>
          <p className="elo-lede">
            Acesse com sua conta institucional para consultar o histórico
            integrado do cidadão.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <div className={`elo-field ${errors.email ? "elo-field-error" : ""}`}>
              <label htmlFor="email">E-mail institucional</label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="elo-field-msg">{errors.email}</div>
            </div>

            <div className={`elo-field ${errors.senha ? "elo-field-error" : ""}`}>
              <label htmlFor="senha">Senha</label>
              <input
                type="password"
                id="senha"
                name="senha"
                autoComplete="current-password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
              <div className="elo-field-msg">{errors.senha}</div>
            </div>

            <div className="elo-row-between">
              <label className="elo-remember">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                Manter-me conectado
              </label>
              <a href="#!">Esqueci minha senha</a>
            </div>

            <button type="submit" className="elo-submit" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          {/* {jsonPreview && (
            <div className="elo-json-panel elo-open">
              <div className="elo-json-panel-head">
                <span>JSON gerado no envio</span>
                <span>{jsonPreview.time}</span>
              </div>
              <pre>{JSON.stringify(jsonPreview.data, null, 2)}</pre>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}