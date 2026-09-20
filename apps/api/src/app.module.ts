import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AdoptionInterestsModule } from "./adoption-interests/adoption-interests.module";
import { AnimalsModule } from "./animals/animals.module";
import { HealthController } from "./health.controller";
import { ContactModule } from "./contact/contact.module";
import { SupportModule } from "./support/support.module";
import { UploadsModule } from "./uploads/uploads.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AnimalsModule,
    AdoptionInterestsModule,
    ContactModule,
    UploadsModule,
    SupportModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
