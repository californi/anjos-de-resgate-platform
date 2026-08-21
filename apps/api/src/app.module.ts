import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AdoptionInterestsModule } from "./adoption-interests/adoption-interests.module";
import { AnimalsModule } from "./animals/animals.module";
import { HealthController } from "./health.controller";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AnimalsModule,
    AdoptionInterestsModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
