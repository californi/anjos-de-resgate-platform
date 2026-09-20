import "dotenv/config";
import {
  AnimalNeedCategory,
  AnimalNeedStatus,
  CampaignStatus,
  PrismaClient,
  SupportDestination,
  SupportFrequency,
  SupportStatus,
} from "@prisma/client";
import { demoAnimals } from "@anjos/shared";

const prisma = new PrismaClient();

async function main() {
  for (const animal of demoAnimals) {
    await prisma.animal.upsert({
      where: { id: animal.id },
      create: animal,
      update: animal,
    });
  }

  await prisma.campaign.upsert({
    where: { id: "demo-campaign-winter" },
    create: {
      id: "demo-campaign-winter",
      title: "Inverno protegido",
      description:
        "Arrecadacao para mantas, caminhas e cuidados dos animais nos dias frios.",
      goalAmountCents: 500000,
      status: CampaignStatus.ACTIVE,
    },
    update: {
      title: "Inverno protegido",
      description:
        "Arrecadacao para mantas, caminhas e cuidados dos animais nos dias frios.",
      goalAmountCents: 500000,
      status: CampaignStatus.ACTIVE,
    },
  });

  await prisma.campaign.upsert({
    where: { id: "demo-campaign-vaccines" },
    create: {
      id: "demo-campaign-vaccines",
      title: "Ciclo de vacinacao",
      description:
        "Campanha para completar a vacinacao dos animais acolhidos pela ONG.",
      goalAmountCents: 350000,
      status: CampaignStatus.ACTIVE,
    },
    update: {
      title: "Ciclo de vacinacao",
      description:
        "Campanha para completar a vacinacao dos animais acolhidos pela ONG.",
      goalAmountCents: 350000,
      status: CampaignStatus.ACTIVE,
    },
  });

  await prisma.animalNeed.upsert({
    where: { id: "demo-need-luna-treatment" },
    create: {
      id: "demo-need-luna-treatment",
      animalId: "demo-luna",
      title: "Acompanhamento veterinario da Luna",
      description:
        "Apoio para exames e retornos veterinarios durante o tratamento da Luna.",
      category: AnimalNeedCategory.VETERINARY,
      targetAmountCents: 120000,
      status: AnimalNeedStatus.OPEN,
    },
    update: {
      title: "Acompanhamento veterinario da Luna",
      description:
        "Apoio para exames e retornos veterinarios durante o tratamento da Luna.",
      category: AnimalNeedCategory.VETERINARY,
      targetAmountCents: 120000,
      status: AnimalNeedStatus.OPEN,
    },
  });

  await prisma.animalNeed.upsert({
    where: { id: "demo-need-mel-food" },
    create: {
      id: "demo-need-mel-food",
      animalId: "demo-mel",
      title: "Racao da Mel",
      description:
        "Contribuicao para manter a alimentacao da Mel enquanto aguarda adocao.",
      category: AnimalNeedCategory.FOOD,
      targetAmountCents: 30000,
      status: AnimalNeedStatus.OPEN,
    },
    update: {
      title: "Racao da Mel",
      description:
        "Contribuicao para manter a alimentacao da Mel enquanto aguarda adocao.",
      category: AnimalNeedCategory.FOOD,
      targetAmountCents: 30000,
      status: AnimalNeedStatus.OPEN,
    },
  });

  const donor = await prisma.donor.upsert({
    where: { email: "apoiador.demo@example.org" },
    create: {
      id: "demo-donor-1",
      name: "Apoiador de demonstracao",
      email: "apoiador.demo@example.org",
    },
    update: { name: "Apoiador de demonstracao" },
  });

  await prisma.supportRecord.upsert({
    where: { id: "demo-support-1" },
    create: {
      id: "demo-support-1",
      donorId: donor.id,
      destination: SupportDestination.CAMPAIGN,
      amountCents: 5000,
      frequency: SupportFrequency.ONE_TIME,
      campaignId: "demo-campaign-winter",
      status: SupportStatus.CONFIRMED,
      message: "Registro ficticio para demonstracao do historico.",
    },
    update: {
      amountCents: 5000,
      status: SupportStatus.CONFIRMED,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
