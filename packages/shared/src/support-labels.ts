import {
  AnimalNeedCategory,
  AnimalNeedStatus,
  CampaignStatus,
  SupportDestination,
  SupportFrequency,
  SupportStatus,
} from "@anjos/domain";

export const supportDestinationLabels: Record<SupportDestination, string> = {
  [SupportDestination.GENERAL]: "Doacao geral",
  [SupportDestination.CAMPAIGN]: "Campanha",
  [SupportDestination.SPONSORSHIP]: "Apadrinhamento",
  [SupportDestination.ANIMAL_NEED]: "Necessidade de um animal",
};

export const supportFrequencyLabels: Record<SupportFrequency, string> = {
  [SupportFrequency.ONE_TIME]: "Apoio unico",
  [SupportFrequency.MONTHLY]: "Apoio mensal",
};

export const supportStatusLabels: Record<SupportStatus, string> = {
  [SupportStatus.PLEDGED]: "Aguardando confirmacao",
  [SupportStatus.CONFIRMED]: "Confirmado",
  [SupportStatus.CANCELLED]: "Cancelado",
};

export const campaignStatusLabels: Record<CampaignStatus, string> = {
  [CampaignStatus.ACTIVE]: "Ativa",
  [CampaignStatus.COMPLETED]: "Concluida",
  [CampaignStatus.ARCHIVED]: "Arquivada",
};

export const animalNeedCategoryLabels: Record<AnimalNeedCategory, string> = {
  [AnimalNeedCategory.FOOD]: "Alimentacao",
  [AnimalNeedCategory.MEDICINE]: "Medicamento",
  [AnimalNeedCategory.VETERINARY]: "Atendimento veterinario",
  [AnimalNeedCategory.SUPPLIES]: "Materiais",
  [AnimalNeedCategory.OTHER]: "Outra",
};

export const animalNeedStatusLabels: Record<AnimalNeedStatus, string> = {
  [AnimalNeedStatus.OPEN]: "Aberta",
  [AnimalNeedStatus.FULFILLED]: "Atendida",
  [AnimalNeedStatus.ARCHIVED]: "Arquivada",
};

export const supportDestinationOptions = Object.entries(
  supportDestinationLabels,
).map(([value, label]) => ({ value: value as SupportDestination, label }));

export const supportFrequencyOptions = Object.entries(
  supportFrequencyLabels,
).map(([value, label]) => ({ value: value as SupportFrequency, label }));

export const animalNeedCategoryOptions = Object.entries(
  animalNeedCategoryLabels,
).map(([value, label]) => ({ value: value as AnimalNeedCategory, label }));
