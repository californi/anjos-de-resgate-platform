import { BadRequestException } from "@nestjs/common";
import { describe, expect, it } from "vitest";
import { AdoptionInterestStatus } from "@anjos/domain";
import { demoAnimals } from "@anjos/shared";
import { InMemoryAnimalsRepository } from "../animals/repositories/in-memory-animals.repository";
import { AdoptionInterestsService } from "./adoption-interests.service";
import { InMemoryAdoptionInterestsRepository } from "./repositories/in-memory-adoption-interests.repository";

describe("AdoptionInterestsService", () => {
  it("registers an initial interest for an available animal", async () => {
    const service = createService();

    const interest = await service.create({
      animalId: "demo-mel",
      requesterName: "Pessoa interessada",
      contact: "contato@example.com",
      message: "Gostaria de conhecer a Mel.",
    });

    expect(interest).toMatchObject({
      animalId: "demo-mel",
      requesterName: "Pessoa interessada",
      status: AdoptionInterestStatus.RECEIVED,
    });
    await expect(service.list()).resolves.toHaveLength(1);
  });

  it("allows interest registration for an animal in treatment", async () => {
    const service = createService();

    await expect(
      service.create({
        animalId: "demo-luna",
        requesterName: "Pessoa interessada",
        contact: "contato@example.com",
      }),
    ).resolves.toMatchObject({
      animalId: "demo-luna",
      status: AdoptionInterestStatus.RECEIVED,
    });
  });

  it("rejects interest registration for an animal already in adoption process", async () => {
    const service = createService();

    await expect(
      service.create({
        animalId: "demo-simba",
        requesterName: "Pessoa interessada",
        contact: "contato@example.com",
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});

function createService() {
  return new AdoptionInterestsService(
    new InMemoryAdoptionInterestsRepository(),
    new InMemoryAnimalsRepository(demoAnimals),
  );
}
