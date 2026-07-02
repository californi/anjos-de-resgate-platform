export enum AnimalStatus {
  AVAILABLE = "AVAILABLE",
  IN_TREATMENT = "IN_TREATMENT",
  IN_ADOPTION_PROCESS = "IN_ADOPTION_PROCESS",
  ADOPTED = "ADOPTED"
}

export enum AnimalSpecies {
  DOG = "DOG",
  CAT = "CAT",
  OTHER = "OTHER"
}

export enum AnimalSex {
  MALE = "MALE",
  FEMALE = "FEMALE",
  UNKNOWN = "UNKNOWN"
}

export enum AnimalSize {
  SMALL = "SMALL",
  MEDIUM = "MEDIUM",
  LARGE = "LARGE",
  UNKNOWN = "UNKNOWN"
}

export type AnimalSnapshot = {
  id: string;
  name: string;
  species: AnimalSpecies;
  sex: AnimalSex;
  size: AnimalSize;
  approximateAge: string;
  description: string;
  photoUrl: string | null;
  status: AnimalStatus;
  specialNeeds: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type AnimalCreateInput = {
  id?: string;
  name: string;
  species: AnimalSpecies;
  sex?: AnimalSex;
  size?: AnimalSize;
  approximateAge: string;
  description: string;
  photoUrl?: string | null;
  status?: AnimalStatus;
  specialNeeds?: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type AnimalUpdateInput = Partial<
  Pick<
    AnimalCreateInput,
    | "name"
    | "species"
    | "sex"
    | "size"
    | "approximateAge"
    | "description"
    | "photoUrl"
    | "status"
    | "specialNeeds"
  >
>;

const enumValues = <T extends Record<string, string>>(enumObject: T) =>
  new Set(Object.values(enumObject));

const animalStatusValues = enumValues(AnimalStatus);
const animalSpeciesValues = enumValues(AnimalSpecies);
const animalSexValues = enumValues(AnimalSex);
const animalSizeValues = enumValues(AnimalSize);

export class Animal {
  private constructor(private readonly props: AnimalSnapshot) {}

  static create(input: AnimalCreateInput): Animal {
    const now = new Date();
    const snapshot: AnimalSnapshot = {
      id: input.id ?? createId(),
      name: normalizeRequiredText(input.name, "name"),
      species: assertEnumValue(input.species, animalSpeciesValues, "species"),
      sex: assertEnumValue(input.sex ?? AnimalSex.UNKNOWN, animalSexValues, "sex"),
      size: assertEnumValue(input.size ?? AnimalSize.UNKNOWN, animalSizeValues, "size"),
      approximateAge: normalizeRequiredText(input.approximateAge, "approximateAge"),
      description: normalizeRequiredText(input.description, "description"),
      photoUrl: input.photoUrl?.trim() || null,
      status: assertEnumValue(
        input.status ?? AnimalStatus.AVAILABLE,
        animalStatusValues,
        "status"
      ),
      specialNeeds: input.specialNeeds ?? false,
      createdAt: input.createdAt ? new Date(input.createdAt) : now,
      updatedAt: input.updatedAt ? new Date(input.updatedAt) : now
    };

    return new Animal(snapshot);
  }

  update(input: AnimalUpdateInput): Animal {
    const updated: AnimalSnapshot = {
      ...this.props,
      name:
        input.name === undefined
          ? this.props.name
          : normalizeRequiredText(input.name, "name"),
      species:
        input.species === undefined
          ? this.props.species
          : assertEnumValue(input.species, animalSpeciesValues, "species"),
      sex:
        input.sex === undefined
          ? this.props.sex
          : assertEnumValue(input.sex, animalSexValues, "sex"),
      size:
        input.size === undefined
          ? this.props.size
          : assertEnumValue(input.size, animalSizeValues, "size"),
      approximateAge:
        input.approximateAge === undefined
          ? this.props.approximateAge
          : normalizeRequiredText(input.approximateAge, "approximateAge"),
      description:
        input.description === undefined
          ? this.props.description
          : normalizeRequiredText(input.description, "description"),
      photoUrl:
        input.photoUrl === undefined ? this.props.photoUrl : input.photoUrl?.trim() || null,
      status:
        input.status === undefined
          ? this.props.status
          : assertEnumValue(input.status, animalStatusValues, "status"),
      specialNeeds:
        input.specialNeeds === undefined ? this.props.specialNeeds : input.specialNeeds,
      updatedAt: new Date()
    };

    return new Animal(updated);
  }

  changeStatus(status: AnimalStatus): Animal {
    return this.update({ status });
  }

  toJSON(): AnimalSnapshot {
    return { ...this.props };
  }
}

function normalizeRequiredText(value: string, fieldName: string): string {
  const normalized = value?.trim();
  if (!normalized) {
    throw new Error(`Animal.${fieldName} is required`);
  }
  return normalized;
}

function assertEnumValue<T extends string>(
  value: T,
  allowedValues: Set<string>,
  fieldName: string
): T {
  if (!allowedValues.has(value)) {
    throw new Error(`Animal.${fieldName} has an invalid value: ${value}`);
  }
  return value;
}

function createId(): string {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }
  return `animal_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}
