import {
  AnimalNeedStatus,
  CampaignStatus,
  SupportStatus,
} from "@anjos/domain";
import { IsEnum } from "class-validator";

export class UpdateSupportStatusDto {
  @IsEnum(SupportStatus)
  status!: SupportStatus;
}

export class UpdateCampaignStatusDto {
  @IsEnum(CampaignStatus)
  status!: CampaignStatus;
}

export class UpdateAnimalNeedStatusDto {
  @IsEnum(AnimalNeedStatus)
  status!: AnimalNeedStatus;
}
