import type { AnimalSnapshot, AnimalStatus } from "@anjos/domain";
import { demoAnimals } from "@anjos/shared";

const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3333";
const INTERNAL_API_URL = process.env.API_INTERNAL_URL ?? PUBLIC_API_URL;

type AnimalResponse = Omit<AnimalSnapshot, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};

export type AnimalsResult = {
  animals: AnimalSnapshot[];
  source: "api" | "demo";
};

export async function listAnimals(): Promise<AnimalsResult> {
  try {
    const response = await fetch(`${getApiUrl()}/animals`, {
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const animals = (await response.json()) as AnimalResponse[];
    return {
      animals: animals.map(normalizeAnimal),
      source: "api"
    };
  } catch {
    return {
      animals: demoAnimals,
      source: "demo"
    };
  }
}

export async function getAnimalById(id: string): Promise<AnimalSnapshot | null> {
  const { animals } = await listAnimals();
  return animals.find((animal) => animal.id === id) ?? null;
}

export async function createAnimal(input: Record<string, unknown>) {
  const response = await fetch(`${getApiUrl()}/animals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(input)
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
      "Content-Type": "application/json"
    },
    body: JSON.stringify(input)
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
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ status })
  });

  if (!response.ok) {
    throw new Error(await readApiError(response));
  }

  return response.json() as Promise<AnimalResponse>;
}

function getApiUrl(): string {
  return typeof window === "undefined" ? INTERNAL_API_URL : PUBLIC_API_URL;
}

function normalizeAnimal(animal: AnimalResponse): AnimalSnapshot {
  return {
    ...animal,
    createdAt: new Date(animal.createdAt),
    updatedAt: new Date(animal.updatedAt)
  };
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
