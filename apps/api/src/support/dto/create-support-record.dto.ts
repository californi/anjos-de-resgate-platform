import { SupportDestination, SupportFrequency } from "@anjos/domain";
import { Type } from "class-transformer";
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";

export class CreateSupportRecordDto {
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  donorName!: string;

  @IsEmail()
  @MaxLength(180)
  donorEmail!: string;

  @IsEnum(SupportDestination)
  destination!: SupportDestination;

  @Type(() => Number)
  @IsInt()
  @Min(100)
  amountCents!: number;

  @IsEnum(SupportFrequency)
  frequency!: SupportFrequency;

  @IsOptional()
  @IsString()
  animalId?: string;

  @IsOptional()
  @IsString()
  campaignId?: string;

  @IsOptional()
  @IsString()
  animalNeedId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  message?: string;
}
