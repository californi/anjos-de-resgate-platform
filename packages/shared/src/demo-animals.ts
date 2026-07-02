import {
  AnimalSex,
  AnimalSize,
  AnimalSpecies,
  AnimalStatus,
  type AnimalSnapshot
} from "@anjos/domain";

const createdAt = new Date("2026-06-01T10:00:00.000Z");

export const demoAnimals: AnimalSnapshot[] = [
  {
    id: "demo-mel",
    name: "Mel",
    species: AnimalSpecies.DOG,
    sex: AnimalSex.FEMALE,
    size: AnimalSize.SMALL,
    approximateAge: "2 anos",
    description: "Cadela docil, vacinada e pronta para uma familia tranquila.",
    photoUrl:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=80",
    status: AnimalStatus.AVAILABLE,
    specialNeeds: false,
    createdAt,
    updatedAt: createdAt
  },
  {
    id: "demo-bento",
    name: "Bento",
    species: AnimalSpecies.CAT,
    sex: AnimalSex.MALE,
    size: AnimalSize.MEDIUM,
    approximateAge: "1 ano",
    description: "Gato curioso, brincalhao e adaptado a ambientes internos.",
    photoUrl:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=900&q=80",
    status: AnimalStatus.AVAILABLE,
    specialNeeds: false,
    createdAt,
    updatedAt: createdAt
  },
  {
    id: "demo-luna",
    name: "Luna",
    species: AnimalSpecies.DOG,
    sex: AnimalSex.FEMALE,
    size: AnimalSize.LARGE,
    approximateAge: "4 anos",
    description: "Esta em tratamento e deve ser acompanhada pela equipe antes da adocao.",
    photoUrl:
      "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=900&q=80",
    status: AnimalStatus.IN_TREATMENT,
    specialNeeds: true,
    createdAt,
    updatedAt: createdAt
  }
];
