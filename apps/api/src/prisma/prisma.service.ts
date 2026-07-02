import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    if (process.env.USE_IN_MEMORY_REPOSITORY !== "true") {
      await this.$connect();
    }
  }

  async onModuleDestroy() {
    if (process.env.USE_IN_MEMORY_REPOSITORY !== "true") {
      await this.$disconnect();
    }
  }
}
