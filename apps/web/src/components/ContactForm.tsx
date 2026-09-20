"use client";

import { type FormEvent, useState } from "react";
import { siteContent } from "@anjos/shared";
import { sendContactMessage } from "@/lib/api";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const content = siteContent.contact.form;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    const form = event.currentTarget;
    const data = new FormData(form);
    try {
      await sendContactMessage({
        name: data.get("name"),
        email: data.get("email"),
        message: data.get("message"),
      });
      form.reset();
      setMessage("Mensagem enviada para a equipe da ONG.");
    } catch (error) {
      setMessage((error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>
        {content.nameLabel}
        <input
          minLength={2}
          name="name"
          placeholder={content.namePlaceholder}
          required
        />
      </label>
      <label>
        {content.emailLabel}
        <input
          name="email"
          placeholder={content.emailPlaceholder}
          required
          type="email"
        />
      </label>
      <label>
        {content.messageLabel}
        <textarea
          minLength={10}
          name="message"
          placeholder={content.messagePlaceholder}
          required
        />
      </label>
      <button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Enviando..." : content.buttonLabel}
      </button>
      {message ? <p className="status-message">{message}</p> : null}
    </form>
  );
}
