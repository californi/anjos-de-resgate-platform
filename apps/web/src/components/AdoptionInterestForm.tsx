"use client";

import { FormEvent, useState } from "react";
import { AnimalStatus } from "@anjos/domain";
import { createAdoptionInterest } from "@/lib/api";

type AdoptionInterestFormProps = {
  animalId: string;
  animalName: string;
  animalStatus: AnimalStatus;
};

export function AdoptionInterestForm({
  animalId,
  animalName,
  animalStatus,
}: AdoptionInterestFormProps) {
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isBlocked = animalStatus === AnimalStatus.IN_ADOPTION_PROCESS;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      await createAdoptionInterest({
        animalId,
        requesterName: data.get("requesterName"),
        contact: data.get("contact"),
        message: data.get("message") || null,
      });
      form.reset();
      setMessage(
        "Interesse registrado. A equipe da ONG fara a avaliacao antes de qualquer proxima etapa.",
      );
    } catch (error) {
      setMessage((error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isBlocked) {
    return (
      <div className="panel" id="interesse">
        <p className="eyebrow">Interesse em adocao</p>
        <h2>Registro indisponivel no momento</h2>
        <p>
          {animalName} ja esta em processo de adocao. A equipe precisa encerrar
          ou reabrir esse processo antes de receber novos interesses.
        </p>
      </div>
    );
  }

  return (
    <form className="panel form" id="interesse" onSubmit={handleSubmit}>
      <div>
        <p className="eyebrow">Interesse em adocao</p>
        <h2>Quero conhecer {animalName}</h2>
        <p className="muted">
          Este cadastro inicia apenas uma conversa com a equipe. Ele nao
          confirma a adocao nem altera automaticamente o status do animal.
        </p>
      </div>

      <label>
        Nome
        <input
          name="requesterName"
          minLength={2}
          required
          placeholder="Seu nome"
        />
      </label>

      <label>
        Contato
        <input
          name="contact"
          minLength={5}
          required
          placeholder="Telefone, WhatsApp ou e-mail"
        />
      </label>

      <label>
        Mensagem
        <textarea
          name="message"
          placeholder="Conte brevemente por que tem interesse neste animal."
        />
      </label>

      <p className="muted">
        Para validacao do prototipo, use dados ficticios. Dados reais exigem
        autenticacao, privacidade e permissoes em iteracao futura.
      </p>

      <button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Registrando..." : "Registrar interesse"}
      </button>

      {message ? <p className="status-message">{message}</p> : null}
    </form>
  );
}
