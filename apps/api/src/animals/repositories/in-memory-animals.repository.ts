import { Animal, type AnimalSnapshot, type AnimalStatus } from "@anjos/domain";
import { demoAnimals } from "@anjos/shared";
import {
  type AnimalRepositoryCreateInput,
  type AnimalRepositoryUpdateInput,
  type AnimalsRepository
} from "./animals.repository";

export class InMemoryAnimalsRepository implements AnimalsRepository {
  private readonly animals = new Map<string, AnimalSnapshot>();

  constructor(initialAnimals: AnimalSnapshot[] = demoAnimals) {
    initialAnimals.forEach((animal) => this.animals.set(animal.id, Animal.create(animal).toJSON()));
  }

  async findAll(): Promise<AnimalSnapshot[]> {
    return [...this.animals.values()].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async findById(id: string): Promise<AnimalSnapshot | null> {
    return this.animals.get(id) ?? null;
  }

  async create(animal: AnimalRepositoryCreateInput): Promise<AnimalSnapshot> {
    this.animals.set(animal.id, animal);
    return animal;
  }

  async update(id: string, animal: AnimalRepositoryUpdateInput): Promise<AnimalSnapshot | null> {
    const current = this.animals.get(id);
    if (!current) {
      return null;
    }

    const updated = { ...current, ...animal, id };
    this.animals.set(id, updated);
    return updated;
  }

  async updateStatus(id: string, status: AnimalStatus): Promise<AnimalSnapshot | null> {
    return this.update(id, { status, updatedAt: new Date() });
  }

  async remove(id: string): Promise<boolean> {
    return this.animals.delete(id);
  }
}
