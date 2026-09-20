"use client";

import { type FormEvent, useState } from "react";
import {
  AnimalNeedStatus,
  CampaignStatus,
  SupportStatus,
  type AnimalNeedSnapshot,
  type AnimalSnapshot,
  type CampaignSnapshot,
  type DonorSnapshot,
  type SupportRecordSnapshot,
} from "@anjos/domain";
import {
  animalNeedCategoryLabels,
  animalNeedCategoryOptions,
  animalNeedStatusLabels,
  campaignStatusLabels,
  supportDestinationLabels,
  supportFrequencyLabels,
  supportStatusLabels,
} from "@anjos/shared";
import {
  createAnimalNeed,
  createCampaign,
  updateAnimalNeedStatus,
  updateCampaignStatus,
  updateSupportRecordStatus,
} from "@/lib/api";

type Props = {
  animals: AnimalSnapshot[];
  campaigns: CampaignSnapshot[];
  needs: AnimalNeedSnapshot[];
  donors: DonorSnapshot[];
  records: SupportRecordSnapshot[];
};

export function AdminSupportDashboard(props: Props) {
  const [message, setMessage] = useState<string | null>(null);
  const donorById = Object.fromEntries(props.donors.map((donor) => [donor.id, donor]));
  const animalById = Object.fromEntries(props.animals.map((animal) => [animal.id, animal]));
  const campaignById = Object.fromEntries(
    props.campaigns.map((campaign) => [campaign.id, campaign]),
  );
  const needById = Object.fromEntries(props.needs.map((need) => [need.id, need]));

  async function submitCampaign(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    await run(async () => {
      await createCampaign({
        title: data.get("title"),
        description: data.get("description"),
        goalAmountCents: Math.round(Number(data.get("goalAmount")) * 100),
      });
      form.reset();
    }, "Campanha cadastrada.");
  }

  async function submitNeed(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const target = Number(data.get("targetAmount"));
    await run(async () => {
      await createAnimalNeed({
        animalId: data.get("animalId"),
        title: data.get("title"),
        description: data.get("description"),
        category: data.get("category"),
        targetAmountCents: target > 0 ? Math.round(target * 100) : undefined,
      });
      form.reset();
    }, "Necessidade cadastrada.");
  }

  async function run(action: () => Promise<unknown>, success: string) {
    setMessage(null);
    try {
      await action();
      setMessage(success);
      window.setTimeout(() => window.location.reload(), 500);
    } catch (error) {
      setMessage((error as Error).message);
    }
  }

  return (
    <div className="support-admin">
      {message ? <p className="status-message">{message}</p> : null}
      <div className="support-metrics">
        <Metric label="Campanhas" value={props.campaigns.length} />
        <Metric label="Necessidades" value={props.needs.length} />
        <Metric label="Doadores" value={props.donors.length} />
        <Metric label="Apoios registrados" value={props.records.length} />
      </div>

      <div className="admin-grid">
        <section className="panel">
          <p className="eyebrow">Arrecadacao</p>
          <h2>Nova campanha</h2>
          <form className="form" onSubmit={submitCampaign}>
            <label>Titulo<input minLength={3} name="title" required /></label>
            <label>Descricao<textarea minLength={10} name="description" required /></label>
            <label>Meta em reais<input min="1" name="goalAmount" required step="0.01" type="number" /></label>
            <button type="submit">Cadastrar campanha</button>
          </form>
        </section>
        <section className="panel">
          <p className="eyebrow">Animal</p>
          <h2>Nova necessidade</h2>
          <form className="form" onSubmit={submitNeed}>
            <label>
              Animal
              <select defaultValue="" name="animalId" required>
                <option disabled value="">Selecione</option>
                {props.animals.map((animal) => (
                  <option key={animal.id} value={animal.id}>{animal.name}</option>
                ))}
              </select>
            </label>
            <label>Titulo<input minLength={3} name="title" required /></label>
            <label>Descricao<textarea minLength={10} name="description" required /></label>
            <div className="form-row">
              <label>
                Categoria
                <select name="category">
                  {animalNeedCategoryOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </label>
              <label>Meta opcional<input min="1" name="targetAmount" step="0.01" type="number" /></label>
            </div>
            <button type="submit">Cadastrar necessidade</button>
          </form>
        </section>
      </div>

      <section className="panel">
        <div className="section-header">
          <div><p className="eyebrow">Administracao</p><h2>Campanhas e necessidades</h2></div>
        </div>
        <div className="support-management-grid">
          {props.campaigns.map((campaign) => (
            <article className="support-admin-item" key={campaign.id}>
              <strong>{campaign.title}</strong>
              <span>{formatCurrency(campaign.goalAmountCents)}</span>
              <select
                aria-label={`Status de ${campaign.title}`}
                defaultValue={campaign.status}
                onChange={(event) =>
                  run(
                    () => updateCampaignStatus(campaign.id, event.target.value as CampaignStatus),
                    "Status da campanha atualizado.",
                  )
                }
              >
                {Object.entries(campaignStatusLabels).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </article>
          ))}
          {props.needs.map((need) => (
            <article className="support-admin-item" key={need.id}>
              <strong>{need.title}</strong>
              <span>{animalById[need.animalId]?.name} · {animalNeedCategoryLabels[need.category]}</span>
              <select
                aria-label={`Status de ${need.title}`}
                defaultValue={need.status}
                onChange={(event) =>
                  run(
                    () => updateAnimalNeedStatus(need.id, event.target.value as AnimalNeedStatus),
                    "Status da necessidade atualizado.",
                  )
                }
              >
                {Object.entries(animalNeedStatusLabels).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="section-header">
          <div><p className="eyebrow">Conferencia</p><h2>Historico de apoio</h2></div>
        </div>
        <div className="support-history">
          {props.records.map((record) => (
            <article className="support-history-item" key={record.id}>
              <div>
                <strong>{donorById[record.donorId]?.name ?? "Doador"}</strong>
                <p>{donorById[record.donorId]?.email}</p>
              </div>
              <div>
                <strong>{supportDestinationLabels[record.destination]}</strong>
                <p>{supportTarget(record, animalById, campaignById, needById)}</p>
              </div>
              <div>
                <strong>{formatCurrency(record.amountCents)}</strong>
                <p>{supportFrequencyLabels[record.frequency]}</p>
              </div>
              <select
                aria-label="Status do apoio"
                defaultValue={record.status}
                onChange={(event) =>
                  run(
                    () => updateSupportRecordStatus(record.id, event.target.value as SupportStatus),
                    "Status do apoio atualizado.",
                  )
                }
              >
                {Object.entries(supportStatusLabels).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </article>
          ))}
          {props.records.length === 0 ? <p className="muted">Nenhum apoio registrado.</p> : null}
        </div>
      </section>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return <div className="support-metric"><strong>{value}</strong><span>{label}</span></div>;
}

function supportTarget(
  record: SupportRecordSnapshot,
  animals: Record<string, AnimalSnapshot>,
  campaigns: Record<string, CampaignSnapshot>,
  needs: Record<string, AnimalNeedSnapshot>,
) {
  if (record.campaignId) return campaigns[record.campaignId]?.title ?? "Campanha";
  if (record.animalNeedId) return needs[record.animalNeedId]?.title ?? "Necessidade";
  if (record.animalId) return animals[record.animalId]?.name ?? "Animal";
  return "Uso geral pela ONG";
}

function formatCurrency(cents: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(cents / 100);
}
