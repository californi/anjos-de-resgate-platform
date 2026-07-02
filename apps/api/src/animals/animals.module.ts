import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AnimalsController } from "./animals.controller";
import { AnimalsService } from "./animals.service";
import { ANIMALS_REPOSITORY } from "./repositories/animals.repository";
import { InMemoryAnimalsRepository } from "./repositories/in-memory-animals.repository";
import { PrismaAnimalsRepository } from "./repositories/prisma-animals.repository";

@Module({
  controllers: [AnimalsController],
  providers: [
    AnimalsService,
    PrismaService,
    {
      provide: ANIMALS_REPOSITORY,
      inject: [PrismaService],
      useFactory: (prisma: PrismaService) => {
        if (process.env.USE_IN_MEMORY_REPOSITORY === "true") {
          return new InMemoryAnimalsRepository();
        }
        return new PrismaAnimalsRepository(prisma);
      }
    }
  ]
})
export class AnimalsModule {}
