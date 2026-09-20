export enum SupportDestination {
  GENERAL = "GENERAL",
  CAMPAIGN = "CAMPAIGN",
  SPONSORSHIP = "SPONSORSHIP",
  ANIMAL_NEED = "ANIMAL_NEED",
}

export enum SupportFrequency {
  ONE_TIME = "ONE_TIME",
  MONTHLY = "MONTHLY",
}

export enum SupportStatus {
  PLEDGED = "PLEDGED",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
}

export enum CampaignStatus {
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
  ARCHIVED = "ARCHIVED",
}

export enum AnimalNeedCategory {
  FOOD = "FOOD",
  MEDICINE = "MEDICINE",
  VETERINARY = "VETERINARY",
  SUPPLIES = "SUPPLIES",
  OTHER = "OTHER",
}

export enum AnimalNeedStatus {
  OPEN = "OPEN",
  FULFILLED = "FULFILLED",
  ARCHIVED = "ARCHIVED",
}

export type CampaignSnapshot = {
  id: string;
  title: string;
  description: string;
  goalAmountCents: number;
  status: CampaignStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type CampaignCreateInput = Omit<
  CampaignSnapshot,
  "id" | "createdAt" | "updatedAt"
> & {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type AnimalNeedSnapshot = {
  id: string;
  animalId: string;
  title: string;
  description: string;
  category: AnimalNeedCategory;
  targetAmountCents: number | null;
  status: AnimalNeedStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type AnimalNeedCreateInput = Omit<
  AnimalNeedSnapshot,
  "id" | "createdAt" | "updatedAt"
> & {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type DonorSnapshot = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export type DonorCreateInput = Omit<
  DonorSnapshot,
  "id" | "createdAt" | "updatedAt"
> & {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type SupportRecordSnapshot = {
  id: string;
  donorId: string;
  destination: SupportDestination;
  amountCents: number;
  frequency: SupportFrequency;
  animalId: string | null;
  campaignId: string | null;
  animalNeedId: string | null;
  message: string | null;
  status: SupportStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type SupportRecordCreateInput = Omit<
  SupportRecordSnapshot,
  "id" | "createdAt" | "updatedAt"
> & {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export class Campaign {
  private constructor(private readonly props: CampaignSnapshot) {}

  static create(input: CampaignCreateInput): Campaign {
    const now = new Date();
    return new Campaign({
      id: input.id ?? createId("campaign"),
      title: requiredText(input.title, "Campaign.title"),
      description: requiredText(input.description, "Campaign.description"),
      goalAmountCents: positiveInteger(
        input.goalAmountCents,
        "Campaign.goalAmountCents",
      ),
      status: enumValue(input.status, CampaignStatus, "Campaign.status"),
      createdAt: input.createdAt ? new Date(input.createdAt) : now,
      updatedAt: input.updatedAt ? new Date(input.updatedAt) : now,
    });
  }

  toJSON(): CampaignSnapshot {
    return { ...this.props };
  }
}

export class AnimalNeed {
  private constructor(private readonly props: AnimalNeedSnapshot) {}

  static create(input: AnimalNeedCreateInput): AnimalNeed {
    const now = new Date();
    return new AnimalNeed({
      id: input.id ?? createId("animal_need"),
      animalId: requiredText(input.animalId, "AnimalNeed.animalId"),
      title: requiredText(input.title, "AnimalNeed.title"),
      description: requiredText(input.description, "AnimalNeed.description"),
      category: enumValue(
        input.category,
        AnimalNeedCategory,
        "AnimalNeed.category",
      ),
      targetAmountCents:
        input.targetAmountCents === null
          ? null
          : positiveInteger(
              input.targetAmountCents,
              "AnimalNeed.targetAmountCents",
            ),
      status: enumValue(input.status, AnimalNeedStatus, "AnimalNeed.status"),
      createdAt: input.createdAt ? new Date(input.createdAt) : now,
      updatedAt: input.updatedAt ? new Date(input.updatedAt) : now,
    });
  }

  toJSON(): AnimalNeedSnapshot {
    return { ...this.props };
  }
}

export class Donor {
  private constructor(private readonly props: DonorSnapshot) {}

  static create(input: DonorCreateInput): Donor {
    const now = new Date();
    const email = requiredText(input.email, "Donor.email").toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      throw new Error("Donor.email is invalid");
    }
    return new Donor({
      id: input.id ?? createId("donor"),
      name: requiredText(input.name, "Donor.name"),
      email,
      createdAt: input.createdAt ? new Date(input.createdAt) : now,
      updatedAt: input.updatedAt ? new Date(input.updatedAt) : now,
    });
  }

  toJSON(): DonorSnapshot {
    return { ...this.props };
  }
}

export class SupportRecord {
  private constructor(private readonly props: SupportRecordSnapshot) {}

  static create(input: SupportRecordCreateInput): SupportRecord {
    const now = new Date();
    const snapshot: SupportRecordSnapshot = {
      id: input.id ?? createId("support"),
      donorId: requiredText(input.donorId, "SupportRecord.donorId"),
      destination: enumValue(
        input.destination,
        SupportDestination,
        "SupportRecord.destination",
      ),
      amountCents: positiveInteger(
        input.amountCents,
        "SupportRecord.amountCents",
      ),
      frequency: enumValue(
        input.frequency,
        SupportFrequency,
        "SupportRecord.frequency",
      ),
      animalId: optionalText(input.animalId),
      campaignId: optionalText(input.campaignId),
      animalNeedId: optionalText(input.animalNeedId),
      message: optionalText(input.message),
      status: enumValue(input.status, SupportStatus, "SupportRecord.status"),
      createdAt: input.createdAt ? new Date(input.createdAt) : now,
      updatedAt: input.updatedAt ? new Date(input.updatedAt) : now,
    };

    validateDestination(snapshot);
    return new SupportRecord(snapshot);
  }

  toJSON(): SupportRecordSnapshot {
    return { ...this.props };
  }
}

function validateDestination(record: SupportRecordSnapshot): void {
  if (record.destination === SupportDestination.CAMPAIGN && !record.campaignId) {
    throw new Error("SupportRecord.campaignId is required for campaign support");
  }
  if (record.destination === SupportDestination.SPONSORSHIP && !record.animalId) {
    throw new Error("SupportRecord.animalId is required for sponsorship");
  }
  if (
    record.destination === SupportDestination.ANIMAL_NEED &&
    !record.animalNeedId
  ) {
    throw new Error(
      "SupportRecord.animalNeedId is required for animal-need support",
    );
  }
}

function requiredText(value: string, fieldName: string): string {
  const normalized = value?.trim();
  if (!normalized) {
    throw new Error(`${fieldName} is required`);
  }
  return normalized;
}

function optionalText(value?: string | null): string | null {
  return value?.trim() || null;
}

function positiveInteger(value: number, fieldName: string): number {
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(`${fieldName} must be a positive integer`);
  }
  return value;
}

function enumValue<T extends Record<string, string>>(
  value: T[keyof T],
  values: T,
  fieldName: string,
): T[keyof T] {
  if (!Object.values(values).includes(value)) {
    throw new Error(`${fieldName} has an invalid value: ${value}`);
  }
  return value;
}

function createId(prefix: string): string {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}
