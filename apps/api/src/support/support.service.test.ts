import { BadRequestException } from "@nestjs/common";
import {
  AnimalNeedCategory,
  SupportDestination,
  SupportFrequency,
  SupportStatus,
} from "@anjos/domain";
import { demoAnimals } from "@anjos/shared";
import { describe, expect, it } from "vitest";
import { InMemoryAnimalsRepository } from "../animals/repositories/in-memory-animals.repository";
import { InMemorySupportRepository } from "./repositories/in-memory-support.repository";
import { SupportService } from "./support.service";

describe("SupportService", () => {
  it("registers and confirms campaign support in the overview", async () => {
    const service = createService();
    const campaign = await service.createCampaign({
      title: "Campanha de racao",
      description: "Arrecadacao para compra de racao dos animais.",
      goalAmountCents: 100000,
    });
    const record = await service.createRecord({
      donorName: "Pessoa apoiadora",
      donorEmail: "apoio@example.org",
      destination: SupportDestination.CAMPAIGN,
      amountCents: 10000,
      frequency: SupportFrequency.ONE_TIME,
      campaignId: campaign.id,
    });

    expect(record.status).toBe(SupportStatus.PLEDGED);
    await service.updateRecordStatus(record.id, SupportStatus.CONFIRMED);
    const overview = await service.overview();
    expect(overview.campaigns[0]?.confirmedAmountCents).toBe(10000);
  });

  it("links an animal need to the corresponding animal", async () => {
    const service = createService();
    const need = await service.createNeed({
      animalId: "demo-luna",
      title: "Consulta veterinaria",
      description: "Apoio para consulta e exames veterinarios.",
      category: AnimalNeedCategory.VETERINARY,
      targetAmountCents: 50000,
    });
    const record = await service.createRecord({
      donorName: "Pessoa apoiadora",
      donorEmail: "apoio@example.org",
      destination: SupportDestination.ANIMAL_NEED,
      amountCents: 5000,
      frequency: SupportFrequency.ONE_TIME,
      animalNeedId: need.id,
    });

    expect(record).toMatchObject({
      animalId: "demo-luna",
      animalNeedId: need.id,
    });
  });

  it("rejects support for an unknown campaign", async () => {
    const service = createService();
    await expect(
      service.createRecord({
        donorName: "Pessoa apoiadora",
        donorEmail: "apoio@example.org",
        destination: SupportDestination.CAMPAIGN,
        amountCents: 5000,
        frequency: SupportFrequency.ONE_TIME,
        campaignId: "missing",
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});

function createService() {
  return new SupportService(
    new InMemorySupportRepository(),
    new InMemoryAnimalsRepository(demoAnimals),
  );
}
