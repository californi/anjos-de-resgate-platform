import { Injectable, ServiceUnavailableException } from "@nestjs/common";
import nodemailer, { type Transporter } from "nodemailer";
import { CreateContactMessageDto } from "./dto/create-contact-message.dto";

@Injectable()
export class ContactService {
  private readonly transporter: Transporter | null;

  constructor() {
    const host = process.env.SMTP_HOST;
    if (!host) {
      this.transporter = null;
      return;
    }

    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASSWORD;
    this.transporter = nodemailer.createTransport({
      host,
      port: Number(process.env.SMTP_PORT ?? 1025),
      secure: process.env.SMTP_SECURE === "true",
      auth: user && pass ? { user, pass } : undefined,
    });
  }

  async send(input: CreateContactMessageDto) {
    if (!this.transporter) {
      throw new ServiceUnavailableException(
        "Envio de e-mail nao configurado neste ambiente",
      );
    }

    const result = await this.transporter.sendMail({
      from: process.env.SMTP_FROM ?? "Plataforma Anjos de Resgate <no-reply@anjos.local>",
      to: process.env.CONTACT_TO ?? "contato@anjos.local",
      replyTo: input.email.trim().toLowerCase(),
      subject: `Contato pelo portal - ${sanitizeHeader(input.name)}`,
      text: [
        `Nome: ${input.name.trim()}`,
        `E-mail: ${input.email.trim().toLowerCase()}`,
        "",
        input.message.trim(),
      ].join("\n"),
    });

    return { accepted: true, messageId: result.messageId };
  }
}

function sanitizeHeader(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}
