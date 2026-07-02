import type { AnimalSnapshot, AnimalStatus } from "@anjos/domain";

export const ANIMALS_REPOSITORY = Symbol("ANIMALS_REPOSITORY");

export type AnimalRepositoryCreateInput = AnimalSnapshot;
export type AnimalRepositoryUpdateInput = Partial<AnimalSnapshot>;

export interface AnimalsRepository {
  findAll(): Promise<AnimalSnapshot[]>;
  findById(id: string): Promise<AnimalSnapshot | null>;
  create(animal: AnimalRepositoryCreateInput): Promise<AnimalSnapshot>;
  update(id: string, animal: AnimalRepositoryUpdateInput): Promise<AnimalSnapshot | null>;
  updateStatus(id: string, status: AnimalStatus): Promise<AnimalSnapshot | null>;
  remove(id: string): Promise<boolean>;
}
