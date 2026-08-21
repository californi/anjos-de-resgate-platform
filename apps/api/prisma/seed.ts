import "dotenv/config";
import { PrismaClient } from "@prisma/client";
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
