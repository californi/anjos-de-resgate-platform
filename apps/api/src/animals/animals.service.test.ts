import { describe, expect, it } from "vitest";
import { AnimalSize, AnimalSpecies, AnimalStatus } from "@anjos/domain";
import { AnimalsService } from "./animals.service";
import { InMemoryAnimalsRepository } from "./repositories/in-memory-animals.repository";

describe("AnimalsService", () => {
  it("lists seed animals from the repository", async () => {
    const service = new AnimalsService(new InMemoryAnimalsRepository());

    await expect(service.list()).resolves.toEqual(
      expect.arrayContaining([expect.objectContaining({ name: "Mel" })])
    );
  });

  it("creates a validated animal", async () => {
    const service = new AnimalsService(new InMemoryAnimalsRepository([]));

    const animal = await service.create({
      name: "Thor",
      species: AnimalSpecies.DOG,
      size: AnimalSize.MEDIUM,
      approximateAge: "3 anos",
      description: "Calmo e companheiro",
      status: AnimalStatus.AVAILABLE
    });

    expect(animal).toMatchObject({
      name: "Thor",
      status: AnimalStatus.AVAILABLE
    });
    await expect(service.list()).resolves.toHaveLength(1);
  });
});
