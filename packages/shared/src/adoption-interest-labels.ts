import { AdoptionInterestStatus } from "@anjos/domain";

export const adoptionInterestStatusLabels: Record<
  AdoptionInterestStatus,
  string
> = {
  [AdoptionInterestStatus.RECEIVED]: "Recebido",
  [AdoptionInterestStatus.CONTACTED]: "Contato iniciado",
  [AdoptionInterestStatus.ARCHIVED]: "Arquivado",
};

export const adoptionInterestStatusOptions = Object.entries(
  adoptionInterestStatusLabels,
).map(([value, label]) => ({ value, label }));
