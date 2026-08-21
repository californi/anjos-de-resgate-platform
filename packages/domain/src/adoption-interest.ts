export enum AdoptionInterestStatus {
  RECEIVED = "RECEIVED",
  CONTACTED = "CONTACTED",
  ARCHIVED = "ARCHIVED",
}

export type AdoptionInterestSnapshot = {
  id: string;
  animalId: string;
  requesterName: string;
  contact: string;
  message: string | null;
  status: AdoptionInterestStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type AdoptionInterestCreateInput = {
  id?: string;
  animalId: string;
  requesterName: string;
  contact: string;
  message?: string | null;
  status?: AdoptionInterestStatus;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

const adoptionInterestStatusValues = new Set(
  Object.values(AdoptionInterestStatus),
);

export class AdoptionInterest {
  private constructor(private readonly props: AdoptionInterestSnapshot) {}

  static create(input: AdoptionInterestCreateInput): AdoptionInterest {
    const now = new Date();
    const snapshot: AdoptionInterestSnapshot = {
      id: input.id ?? createId(),
      animalId: normalizeRequiredText(input.animalId, "animalId"),
      requesterName: normalizeRequiredText(
        input.requesterName,
        "requesterName",
      ),
      contact: normalizeRequiredText(input.contact, "contact"),
      message: input.message?.trim() || null,
      status: assertStatus(input.status ?? AdoptionInterestStatus.RECEIVED),
      createdAt: input.createdAt ? new Date(input.createdAt) : now,
      updatedAt: input.updatedAt ? new Date(input.updatedAt) : now,
    };

    return new AdoptionInterest(snapshot);
  }

  changeStatus(status: AdoptionInterestStatus): AdoptionInterest {
    return new AdoptionInterest({
      ...this.props,
      status: assertStatus(status),
      updatedAt: new Date(),
    });
  }

  toJSON(): AdoptionInterestSnapshot {
    return { ...this.props };
  }
}

function normalizeRequiredText(value: string, fieldName: string): string {
  const normalized = value?.trim();
  if (!normalized) {
    throw new Error(`AdoptionInterest.${fieldName} is required`);
  }
  return normalized;
}

function assertStatus(status: AdoptionInterestStatus): AdoptionInterestStatus {
  if (!adoptionInterestStatusValues.has(status)) {
    throw new Error(`AdoptionInterest.status has an invalid value: ${status}`);
  }
  return status;
}

function createId(): string {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }
  return `adoption_interest_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}
