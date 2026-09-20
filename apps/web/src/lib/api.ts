import type {
  AdoptionInterestSnapshot,
  AdoptionInterestStatus,
  AnimalNeedSnapshot,
  AnimalNeedStatus,
  AnimalSnapshot,
  AnimalStatus,
  CampaignSnapshot,
  CampaignStatus,
  DonorSnapshot,
  SupportRecordSnapshot,
  SupportStatus,
} from "@anjos/domain";
import { demoAnimals } from "@anjos/shared";

const PUBLIC_API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3333";
const INTERNAL_API_URL = process.env.API_INTERNAL_URL ?? PUBLIC_API_URL;

type AnimalResponse = Omit<AnimalSnapshot, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};

type AdoptionInterestResponse = Omit<
  AdoptionInterestSnapshot,
  "createdAt" | "updatedAt"
> & {
  createdAt: string;
  updatedAt: string;
};

type CampaignResponse = Omit<CampaignSnapshot, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
  confirmedAmountCents?: number;
};

type AnimalNeedResponse = Omit<
  AnimalNeedSnapshot,
  "createdAt" | "updatedAt"
> & {
  createdAt: string;
  updatedAt: string;
  confirmedAmountCents?: number;
};

type DonorResponse = Omit<DonorSnapshot, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};

type SupportRecordResponse = Omit<
  SupportRecordSnapshot,
  "createdAt" | "updatedAt"
> & {
  createdAt: string;
  updatedAt: string;
};

export type SupportOverview = {
  campaigns: Array<CampaignSnapshot & { confirmedAmountCents: number }>;
  needs: Array<AnimalNeedSnapshot & { confirmedAmountCents: number }>;
};

export type SupportAdminData = {
  campaigns: CampaignSnapshot[];
  needs: AnimalNeedSnapshot[];
  donors: DonorSnapshot[];
  records: SupportRecordSnapshot[];
  source: "api" | "empty";
};

export type AnimalsResult = {
  animals: AnimalSnapshot[];
  source: "api" | "demo";
};

export type AdoptionInterestsResult = {
  interests: AdoptionInterestSnapshot[];
  source: "api" | "empty";
};

export async function listAnimals(): Promise<AnimalsResult> {
  try {
    const response = await fetch(`${getApiUrl()}/animals`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const animals = (await response.json()) as AnimalResponse[];
    return {
      animals: animals.map(normalizeAnimal),
      source: "api",
    };
  } catch {
    return {
      animals: demoAnimals,
      source: "demo",
    };
  }
}

export async function getAnimalById(
  id: string,
): Promise<AnimalSnapshot | null> {
  const { animals } = await listAnimals();
  return animals.find((animal) => animal.id === id) ?? null;
}

export async function createAnimal(input: Record<string, unknown>) {
  const response = await fetch(`${getApiUrl()}/animals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error(await readApiError(response));
  }

  return response.json() as Promise<AnimalResponse>;
}

export async function updateAnimal(id: string, input: Record<string, unknown>) {
  const response = await fetch(`${getApiUrl()}/animals/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error(await readApiError(response));
  }

  return response.json() as Promise<AnimalResponse>;
}

export async function updateAnimalStatus(id: string, status: AnimalStatus) {
  const response = await fetch(`${getApiUrl()}/animals/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error(await readApiError(response));
  }

  return response.json() as Promise<AnimalResponse>;
}

export async function listAdoptionInterests(): Promise<AdoptionInterestsResult> {
  try {
    const response = await fetch(`${getApiUrl()}/adoption-interests`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const interests = (await response.json()) as AdoptionInterestResponse[];
    return {
      interests: interests.map(normalizeAdoptionInterest),
      source: "api",
    };
  } catch {
    return {
      interests: [],
      source: "empty",
    };
  }
}

export async function createAdoptionInterest(input: Record<string, unknown>) {
  const response = await fetch(`${getApiUrl()}/adoption-interests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error(await readApiError(response));
  }

  return response.json() as Promise<AdoptionInterestResponse>;
}

export async function updateAdoptionInterestStatus(
  id: string,
  status: AdoptionInterestStatus,
) {
  const response = await fetch(
    `${getApiUrl()}/adoption-interests/${id}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    },
  );

  if (!response.ok) {
    throw new Error(await readApiError(response));
  }

  return response.json() as Promise<AdoptionInterestResponse>;
}

export async function uploadAnimalImage(file: File): Promise<string> {
  const form = new FormData();
  form.append("file", file);
  const response = await fetch(`${PUBLIC_API_URL}/uploads/images`, {
    method: "POST",
    body: form,
  });
  if (!response.ok) throw new Error(await readApiError(response));
  const result = (await response.json()) as { path: string };
  return `${PUBLIC_API_URL}${result.path}`;
}

export async function sendContactMessage(input: Record<string, unknown>) {
  const response = await fetch(`${getApiUrl()}/contact-messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!response.ok) throw new Error(await readApiError(response));
  return response.json() as Promise<{ accepted: boolean; messageId: string }>;
}

export async function getSupportOverview(): Promise<SupportOverview> {
  try {
    const response = await fetch(`${getApiUrl()}/support/overview`, {
      cache: "no-store",
    });
    if (!response.ok) throw new Error(`API returned ${response.status}`);
    const value = (await response.json()) as {
      campaigns: CampaignResponse[];
      needs: AnimalNeedResponse[];
    };
    return {
      campaigns: value.campaigns.map((campaign) => ({
        ...normalizeCampaign(campaign),
        confirmedAmountCents: campaign.confirmedAmountCents ?? 0,
      })),
      needs: value.needs.map((need) => ({
        ...normalizeNeed(need),
        confirmedAmountCents: need.confirmedAmountCents ?? 0,
      })),
    };
  } catch {
    return { campaigns: [], needs: [] };
  }
}

export async function getSupportAdminData(): Promise<SupportAdminData> {
  try {
    const [campaignsResponse, needsResponse, donorsResponse, recordsResponse] =
      await Promise.all([
        fetch(`${getApiUrl()}/support/campaigns`, { cache: "no-store" }),
        fetch(`${getApiUrl()}/support/needs`, { cache: "no-store" }),
        fetch(`${getApiUrl()}/support/donors`, { cache: "no-store" }),
        fetch(`${getApiUrl()}/support/records`, { cache: "no-store" }),
      ]);
    if (
      !campaignsResponse.ok ||
      !needsResponse.ok ||
      !donorsResponse.ok ||
      !recordsResponse.ok
    ) {
      throw new Error("Support API unavailable");
    }
    return {
      campaigns: ((await campaignsResponse.json()) as CampaignResponse[]).map(
        normalizeCampaign,
      ),
      needs: ((await needsResponse.json()) as AnimalNeedResponse[]).map(
        normalizeNeed,
      ),
      donors: ((await donorsResponse.json()) as DonorResponse[]).map(
        normalizeDonor,
      ),
      records: ((await recordsResponse.json()) as SupportRecordResponse[]).map(
        normalizeSupportRecord,
      ),
      source: "api",
    };
  } catch {
    return { campaigns: [], needs: [], donors: [], records: [], source: "empty" };
  }
}

export async function createSupportRecord(input: Record<string, unknown>) {
  return writeSupport("/support/records", "POST", input);
}

export async function createCampaign(input: Record<string, unknown>) {
  return writeSupport("/support/campaigns", "POST", input);
}

export async function createAnimalNeed(input: Record<string, unknown>) {
  return writeSupport("/support/needs", "POST", input);
}

export async function updateSupportRecordStatus(id: string, status: SupportStatus) {
  return writeSupport(`/support/records/${id}/status`, "PATCH", { status });
}

export async function updateCampaignStatus(id: string, status: CampaignStatus) {
  return writeSupport(`/support/campaigns/${id}/status`, "PATCH", { status });
}

export async function updateAnimalNeedStatus(id: string, status: AnimalNeedStatus) {
  return writeSupport(`/support/needs/${id}/status`, "PATCH", { status });
}

function getApiUrl(): string {
  return typeof window === "undefined" ? INTERNAL_API_URL : PUBLIC_API_URL;
}

function normalizeAnimal(animal: AnimalResponse): AnimalSnapshot {
  return {
    ...animal,
    createdAt: new Date(animal.createdAt),
    updatedAt: new Date(animal.updatedAt),
  };
}

function normalizeAdoptionInterest(
  interest: AdoptionInterestResponse,
): AdoptionInterestSnapshot {
  return {
    ...interest,
    createdAt: new Date(interest.createdAt),
    updatedAt: new Date(interest.updatedAt),
  };
}

function normalizeCampaign(value: CampaignResponse): CampaignSnapshot {
  return {
    ...value,
    createdAt: new Date(value.createdAt),
    updatedAt: new Date(value.updatedAt),
  };
}

function normalizeNeed(value: AnimalNeedResponse): AnimalNeedSnapshot {
  return {
    ...value,
    createdAt: new Date(value.createdAt),
    updatedAt: new Date(value.updatedAt),
  };
}

function normalizeDonor(value: DonorResponse): DonorSnapshot {
  return {
    ...value,
    createdAt: new Date(value.createdAt),
    updatedAt: new Date(value.updatedAt),
  };
}

function normalizeSupportRecord(
  value: SupportRecordResponse,
): SupportRecordSnapshot {
  return {
    ...value,
    createdAt: new Date(value.createdAt),
    updatedAt: new Date(value.updatedAt),
  };
}

async function writeSupport(
  path: string,
  method: "POST" | "PATCH",
  input: Record<string, unknown>,
) {
  const response = await fetch(`${getApiUrl()}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!response.ok) throw new Error(await readApiError(response));
  return response.json() as Promise<Record<string, unknown>>;
}

async function readApiError(response: Response): Promise<string> {
  try {
    const body = (await response.json()) as { message?: string | string[] };
    if (Array.isArray(body.message)) {
      return body.message.join(", ");
    }
    return body.message ?? `Erro HTTP ${response.status}`;
  } catch {
    return `Erro HTTP ${response.status}`;
  }
}
