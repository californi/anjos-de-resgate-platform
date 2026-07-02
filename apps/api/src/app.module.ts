import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AnimalsModule } from "./animals/animals.module";
import { HealthController } from "./health.controller";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AnimalsModule
  ],
  controllers: [HealthController]
})
export class AppModule {}
