import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ANIMALS_REPOSITORY } from "../animals/repositories/animals.repository";
import { InMemoryAnimalsRepository } from "../animals/repositories/in-memory-animals.repository";
import { PrismaAnimalsRepository } from "../animals/repositories/prisma-animals.repository";
import { AdoptionInterestsController } from "./adoption-interests.controller";
import { AdoptionInterestsService } from "./adoption-interests.service";
import { ADOPTION_INTERESTS_REPOSITORY } from "./repositories/adoption-interests.repository";
import { InMemoryAdoptionInterestsRepository } from "./repositories/in-memory-adoption-interests.repository";
import { PrismaAdoptionInterestsRepository } from "./repositories/prisma-adoption-interests.repository";

@Module({
  controllers: [AdoptionInterestsController],
  providers: [
    AdoptionInterestsService,
    PrismaService,
    {
      provide: ADOPTION_INTERESTS_REPOSITORY,
      inject: [PrismaService],
      useFactory: (prisma: PrismaService) => {
        if (process.env.USE_IN_MEMORY_REPOSITORY === "true") {
          return new InMemoryAdoptionInterestsRepository();
        }
        return new PrismaAdoptionInterestsRepository(prisma);
      },
    },
    {
      provide: ANIMALS_REPOSITORY,
      inject: [PrismaService],
      useFactory: (prisma: PrismaService) => {
        if (process.env.USE_IN_MEMORY_REPOSITORY === "true") {
          return new InMemoryAnimalsRepository();
        }
        return new PrismaAnimalsRepository(prisma);
      },
    },
  ],
})
export class AdoptionInterestsModule {}
