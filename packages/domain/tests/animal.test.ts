import { describe, expect, it } from "vitest";
import { Animal, AnimalSex, AnimalSize, AnimalSpecies, AnimalStatus } from "../src";

describe("Animal", () => {
  it("creates an available animal with normalized data", () => {
    const animal = Animal.create({
      name: "  Mel ",
      species: AnimalSpecies.DOG,
      sex: AnimalSex.FEMALE,
      size: AnimalSize.SMALL,
      approximateAge: "2 anos",
      description: "Docil e vacinada",
      specialNeeds: false
    });

    expect(animal.toJSON()).toMatchObject({
      name: "Mel",
      species: AnimalSpecies.DOG,
      status: AnimalStatus.AVAILABLE
    });
  });

  it("rejects invalid status values", () => {
    expect(() =>
      Animal.create({
        name: "Nina",
        species: AnimalSpecies.CAT,
        approximateAge: "1 ano",
        description: "Curiosa",
        status: "LOST" as AnimalStatus
      })
    ).toThrow("Animal.status has an invalid value");
  });
});
