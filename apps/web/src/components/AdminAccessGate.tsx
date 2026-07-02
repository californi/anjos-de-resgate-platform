"use client";

import { type FormEvent, type ReactNode, useEffect, useState } from "react";
import { siteContent } from "@anjos/shared";

const STORAGE_KEY = "anjos-admin-prototype-access";
const DEFAULT_CODE = siteContent.admin.simulatedAccessCode;

type AdminAccessGateProps = {
  children: ReactNode;
};

export function AdminAccessGate({ children }: AdminAccessGateProps) {
  const [code, setCode] = useState("");
  const [isAllowed, setIsAllowed] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setIsAllowed(window.localStorage.getItem(STORAGE_KEY) === "granted");
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const expectedCode = process.env.NEXT_PUBLIC_ADMIN_ACCESS_CODE ?? DEFAULT_CODE;

    if (code.trim() === expectedCode) {
      window.localStorage.setItem(STORAGE_KEY, "granted");
      setIsAllowed(true);
      setMessage(null);
      return;
    }

    setMessage("Codigo invalido para o prototipo.");
  }

  function handleExit() {
    window.localStorage.removeItem(STORAGE_KEY);
    setIsAllowed(false);
    setCode("");
  }

  if (isAllowed) {
    return (
      <div className="admin-gate">
        <div className="prototype-note">
          <strong>Acesso administrativo simulado.</strong> Esta barreira existe apenas para
          validacao do Prototipo 1; autenticacao real entra em iteracao futura.
          <button type="button" onClick={handleExit}>
            Sair do modo admin
          </button>
        </div>
        {children}
      </div>
    );
  }

  return (
    <section className="section compact-section">
      <div className="panel narrow-panel">
        <p className="eyebrow">Acesso administrativo</p>
        <h2>Entrar no painel do prototipo</h2>
        <p className="muted">
          Use o codigo de validacao local para acessar o cadastro e a edicao de animais.
        </p>
        <form className="form" onSubmit={handleSubmit}>
          <label>
            Codigo de acesso
            <input
              autoComplete="off"
              name="adminCode"
              onChange={(event) => setCode(event.target.value)}
              placeholder={DEFAULT_CODE}
              type="password"
              value={code}
            />
          </label>
          <button type="submit">Acessar painel</button>
          {message ? <p className="status-message">{message}</p> : null}
        </form>
      </div>
    </section>
  );
}
