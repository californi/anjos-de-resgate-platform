import { AnimalSex, AnimalSize, AnimalSpecies, AnimalStatus } from "@anjos/domain";

export const animalSpeciesLabels: Record<AnimalSpecies, string> = {
  [AnimalSpecies.DOG]: "Cachorro",
  [AnimalSpecies.CAT]: "Gato",
  [AnimalSpecies.OTHER]: "Outro"
};

export const animalSexLabels: Record<AnimalSex, string> = {
  [AnimalSex.MALE]: "Macho",
  [AnimalSex.FEMALE]: "Femea",
  [AnimalSex.UNKNOWN]: "Nao informado"
};

export const animalSizeLabels: Record<AnimalSize, string> = {
  [AnimalSize.SMALL]: "Pequeno",
  [AnimalSize.MEDIUM]: "Medio",
  [AnimalSize.LARGE]: "Grande",
  [AnimalSize.UNKNOWN]: "Nao informado"
};

export const animalStatusLabels: Record<AnimalStatus, string> = {
  [AnimalStatus.AVAILABLE]: "Disponivel",
  [AnimalStatus.IN_TREATMENT]: "Em tratamento",
  [AnimalStatus.IN_ADOPTION_PROCESS]: "Em processo de adocao",
  [AnimalStatus.ADOPTED]: "Adotado"
};

export const animalStatusOptions = Object.entries(animalStatusLabels).map(
  ([value, label]) => ({ value, label })
);

export const animalSpeciesOptions = Object.entries(animalSpeciesLabels).map(
  ([value, label]) => ({ value, label })
);

export const animalSexOptions = Object.entries(animalSexLabels).map(([value, label]) => ({
  value,
  label
}));

export const animalSizeOptions = Object.entries(animalSizeLabels).map(([value, label]) => ({
  value,
  label
}));

export const defaultAnimalPhotoUrl =
  "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=80";
