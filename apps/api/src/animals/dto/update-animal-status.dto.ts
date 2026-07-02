import { AnimalStatus } from "@anjos/domain";
import { IsEnum } from "class-validator";

export class UpdateAnimalStatusDto {
  @IsEnum(AnimalStatus)
  status!: AnimalStatus;
}
