import { Module } from "@nestjs/common";
import { ANIMALS_REPOSITORY } from "../animals/repositories/animals.repository";
import { InMemoryAnimalsRepository } from "../animals/repositories/in-memory-animals.repository";
import { PrismaAnimalsRepository } from "../animals/repositories/prisma-animals.repository";
import { PrismaService } from "../prisma/prisma.service";
import { InMemorySupportRepository } from "./repositories/in-memory-support.repository";
import { PrismaSupportRepository } from "./repositories/prisma-support.repository";
import { SUPPORT_REPOSITORY } from "./repositories/support.repository";
import { SupportController } from "./support.controller";
import { SupportService } from "./support.service";

@Module({
  controllers: [SupportController],
  providers: [
    SupportService,
    PrismaService,
    {
      provide: SUPPORT_REPOSITORY,
      inject: [PrismaService],
      useFactory: (prisma: PrismaService) =>
        process.env.USE_IN_MEMORY_REPOSITORY === "true"
          ? new InMemorySupportRepository()
          : new PrismaSupportRepository(prisma),
    },
    {
      provide: ANIMALS_REPOSITORY,
      inject: [PrismaService],
      useFactory: (prisma: PrismaService) =>
        process.env.USE_IN_MEMORY_REPOSITORY === "true"
          ? new InMemoryAnimalsRepository()
          : new PrismaAnimalsRepository(prisma),
    },
  ],
})
export class SupportModule {}
