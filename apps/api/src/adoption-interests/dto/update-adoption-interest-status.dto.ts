import { AdoptionInterestStatus } from "@anjos/domain";
import { IsEnum } from "class-validator";

export class UpdateAdoptionInterestStatusDto {
  @IsEnum(AdoptionInterestStatus)
  status!: AdoptionInterestStatus;
}
