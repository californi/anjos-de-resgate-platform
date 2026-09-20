"use client";

import { type FormEvent, useMemo, useState } from "react";
import {
  AnimalStatus,
  SupportDestination,
  SupportFrequency,
  type AnimalNeedSnapshot,
  type AnimalSnapshot,
  type CampaignSnapshot,
} from "@anjos/domain";
import {
  animalNeedCategoryLabels,
  supportDestinationOptions,
  supportFrequencyOptions,
} from "@anjos/shared";
import { createSupportRecord } from "@/lib/api";

type SupportHubProps = {
  campaigns: Array<CampaignSnapshot & { confirmedAmountCents: number }>;
  needs: Array<AnimalNeedSnapshot & { confirmedAmountCents: number }>;
  animals: AnimalSnapshot[];
  initialAnimalId?: string;
  pixKey: string;
  pixRecipient: string;
};

export function SupportHub({
  campaigns,
  needs,
  animals,
  initialAnimalId,
  pixKey,
  pixRecipient,
}: SupportHubProps) {
  const initialAnimalIsEligible = animals.some(
    (animal) => animal.id === initialAnimalId && animal.status !== AnimalStatus.ADOPTED,
  );
  const [destination, setDestination] = useState(
    initialAnimalIsEligible ? SupportDestination.SPONSORSHIP : SupportDestination.GENERAL,
  );
  const [selectedCampaignId, setSelectedCampaignId] = useState("");
  const [selectedNeedId, setSelectedNeedId] = useState("");
  const [selectedAnimalId, setSelectedAnimalId] = useState(
    initialAnimalIsEligible ? initialAnimalId ?? "" : "",
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const eligibleAnimals = useMemo(
    () => animals.filter((animal) => animal.status !== AnimalStatus.ADOPTED),
    [animals],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    const form = event.currentTarget;
    const data = new FormData(form);
    const amount = Number(data.get("amount"));
    try {
      await createSupportRecord({
        donorName: data.get("donorName"),
        donorEmail: data.get("donorEmail"),
        destination,
        amountCents: Math.round(amount * 100),
        frequency: data.get("frequency"),
        animalId: data.get("animalId") || undefined,
        campaignId: data.get("campaignId") || undefined,
        animalNeedId: data.get("animalNeedId") || undefined,
        message: data.get("message") || undefined,
      });
      form.reset();
      setDestination(SupportDestination.GENERAL);
      setSelectedCampaignId("");
      setSelectedNeedId("");
      setSelectedAnimalId("");
      setMessage(
        `Apoio registrado. Realize o Pix para ${pixKey} (${pixRecipient}) e aguarde a confirmacao da ONG.`,
      );
    } catch (error) {
      setMessage((error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <section className="section compact-section">
        <div className="support-summary-grid">
          <article className="support-highlight">
            <p className="eyebrow">Doacao geral</p>
            <h2>Apoie a rotina da ONG</h2>
            <p>Contribua com alimentacao, atendimento e manutencao cotidiana.</p>
            <button
              type="button"
              onClick={() => {
                setDestination(SupportDestination.GENERAL);
                setSelectedCampaignId("");
                setSelectedNeedId("");
                setSelectedAnimalId("");
                requestAnimationFrame(() =>
                  document
                    .getElementById("support-form")
                    ?.scrollIntoView({ behavior: "smooth" }),
                );
              }}
            >
              Registrar doacao geral
            </button>
          </article>
          <article className="support-highlight pix-card">
            <p className="eyebrow">Pagamento por Pix</p>
            <h2>{pixRecipient}</h2>
            <code>{pixKey}</code>
            <p>O registro fica pendente ate a equipe confirmar o recebimento.</p>
          </article>
        </div>
      </section>

      <section className="section compact-section">
        <div className="section-header">
          <div>
            <p className="eyebrow">Arrecadacoes ativas</p>
            <h2>Campanhas</h2>
          </div>
        </div>
        <div className="support-card-grid">
          {campaigns.map((campaign) => (
            <article className="support-card" key={campaign.id}>
              <h3>{campaign.title}</h3>
              <p>{campaign.description}</p>
              <SupportProgress
                current={campaign.confirmedAmountCents}
                target={campaign.goalAmountCents}
              />
              <button
                type="button"
                onClick={() => {
                  setDestination(SupportDestination.CAMPAIGN);
                  setSelectedCampaignId(campaign.id);
                  setSelectedNeedId("");
                  setSelectedAnimalId("");
                  requestAnimationFrame(() =>
                    document
                      .getElementById("support-form")
                      ?.scrollIntoView({ behavior: "smooth" }),
                  );
                }}
              >
                Apoiar campanha
              </button>
            </article>
          ))}
          {campaigns.length === 0 ? <p className="muted">Nenhuma campanha ativa.</p> : null}
        </div>
      </section>

      <section className="section compact-section">
        <div className="section-header">
          <div>
            <p className="eyebrow">Apoio direcionado</p>
            <h2>Necessidades por animal</h2>
          </div>
        </div>
        <div className="support-card-grid">
          {needs.map((need) => {
            const animal = animals.find((item) => item.id === need.animalId);
            return (
              <article className="support-card" key={need.id}>
                <p className="support-card__meta">
                  {animal?.name ?? "Animal"} · {animalNeedCategoryLabels[need.category]}
                </p>
                <h3>{need.title}</h3>
                <p>{need.description}</p>
                {need.targetAmountCents ? (
                  <SupportProgress
                    current={need.confirmedAmountCents}
                    target={need.targetAmountCents}
                  />
                ) : null}
                <button
                  type="button"
                  onClick={() => {
                    setDestination(SupportDestination.ANIMAL_NEED);
                    setSelectedNeedId(need.id);
                    setSelectedCampaignId("");
                    setSelectedAnimalId("");
                    requestAnimationFrame(() =>
                      document
                        .getElementById("support-form")
                        ?.scrollIntoView({ behavior: "smooth" }),
                    );
                  }}
                >
                  Apoiar necessidade
                </button>
              </article>
            );
          })}
          {needs.length === 0 ? <p className="muted">Nenhuma necessidade aberta.</p> : null}
        </div>
      </section>

      <section className="section compact-section" id="support-form">
        <div className="panel support-form-panel">
          <div>
            <p className="eyebrow">Registro de apoio</p>
            <h2>Informe como deseja ajudar</h2>
            <p className="muted">
              Este registro nao confirma pagamento. A equipe confere o Pix e atualiza o historico.
            </p>
          </div>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label>
                Nome
                <input minLength={2} name="donorName" required />
              </label>
              <label>
                E-mail
                <input name="donorEmail" required type="email" />
              </label>
            </div>
            <div className="form-row">
              <label>
                Tipo de apoio
                <select
                  name="destination"
                  onChange={(event) => {
                    const nextDestination = event.target.value as SupportDestination;
                    setDestination(nextDestination);
                    if (nextDestination !== SupportDestination.CAMPAIGN) {
                      setSelectedCampaignId("");
                    }
                    if (nextDestination !== SupportDestination.ANIMAL_NEED) {
                      setSelectedNeedId("");
                    }
                    if (nextDestination !== SupportDestination.SPONSORSHIP) {
                      setSelectedAnimalId("");
                    }
                  }}
                  value={destination}
                >
                  {supportDestinationOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Frequencia
                <select name="frequency" defaultValue={SupportFrequency.ONE_TIME}>
                  {supportFrequencyOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            {destination === SupportDestination.CAMPAIGN ? (
              <label>
                Campanha
                <select
                  name="campaignId"
                  onChange={(event) => setSelectedCampaignId(event.target.value)}
                  required
                  value={selectedCampaignId}
                >
                  <option disabled value="">Selecione</option>
                  {campaigns.map((campaign) => (
                    <option key={campaign.id} value={campaign.id}>{campaign.title}</option>
                  ))}
                </select>
              </label>
            ) : null}
            {destination === SupportDestination.SPONSORSHIP ? (
              <label>
                Animal a apadrinhar
                <select
                  name="animalId"
                  onChange={(event) => setSelectedAnimalId(event.target.value)}
                  required
                  value={selectedAnimalId}
                >
                  <option disabled value="">Selecione</option>
                  {eligibleAnimals.map((animal) => (
                    <option key={animal.id} value={animal.id}>{animal.name}</option>
                  ))}
                </select>
              </label>
            ) : null}
            {destination === SupportDestination.ANIMAL_NEED ? (
              <label>
                Necessidade
                <select
                  name="animalNeedId"
                  onChange={(event) => setSelectedNeedId(event.target.value)}
                  required
                  value={selectedNeedId}
                >
                  <option disabled value="">Selecione</option>
                  {needs.map((need) => (
                    <option key={need.id} value={need.id}>{need.title}</option>
                  ))}
                </select>
              </label>
            ) : null}
            <label>
              Valor em reais
              <input min="1" name="amount" required step="0.01" type="number" />
            </label>
            <label>
              Mensagem opcional
              <textarea maxLength={500} name="message" />
            </label>
            <button disabled={isSubmitting} type="submit">
              {isSubmitting ? "Registrando..." : "Registrar apoio"}
            </button>
            {message ? <p className="status-message">{message}</p> : null}
          </form>
        </div>
      </section>
    </>
  );
}

function SupportProgress({ current, target }: { current: number; target: number }) {
  const percentage = Math.min(100, Math.round((current / target) * 100));
  return (
    <div className="support-progress">
      <div aria-label={`${percentage}% arrecadado`} className="support-progress__bar">
        <span style={{ width: `${percentage}%` }} />
      </div>
      <p>{formatCurrency(current)} de {formatCurrency(target)} ({percentage}%)</p>
    </div>
  );
}

function formatCurrency(cents: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cents / 100);
}
