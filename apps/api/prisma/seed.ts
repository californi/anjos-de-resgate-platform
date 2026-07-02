import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const animals = [
  {
    id: "demo-mel",
    name: "Mel",
    species: "DOG",
    sex: "FEMALE",
    size: "SMALL",
    approximateAge: "2 anos",
    description: "Cadela docil, vacinada e pronta para uma familia tranquila.",
    photoUrl:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=80",
    status: "AVAILABLE",
    specialNeeds: false
  },
  {
    id: "demo-bento",
    name: "Bento",
    species: "CAT",
    sex: "MALE",
    size: "MEDIUM",
    approximateAge: "1 ano",
    description: "Gato curioso, brincalhao e adaptado a ambientes internos.",
    photoUrl:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=900&q=80",
    status: "AVAILABLE",
    specialNeeds: false
  },
  {
    id: "demo-luna",
    name: "Luna",
    species: "DOG",
    sex: "FEMALE",
    size: "LARGE",
    approximateAge: "4 anos",
    description: "Esta em tratamento e deve ser acompanhada pela equipe antes da adocao.",
    photoUrl:
      "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=900&q=80",
    status: "IN_TREATMENT",
    specialNeeds: true
  }
];

async function main() {
  for (const animal of animals) {
    await prisma.animal.upsert({
      where: { id: animal.id },
      create: animal,
      update: animal
    });
  }
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
