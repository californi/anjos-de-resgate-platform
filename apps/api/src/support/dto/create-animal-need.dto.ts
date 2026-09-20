import { AnimalNeedCategory } from "@anjos/domain";
import { Type } from "class-transformer";
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from "class-validator";

export class CreateAnimalNeedDto {
  @IsString()
  @MinLength(1)
  animalId!: string;

  @IsString()
  @MinLength(3)
  title!: string;

  @IsString()
  @MinLength(10)
  description!: string;

  @IsEnum(AnimalNeedCategory)
  category!: AnimalNeedCategory;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  targetAmountCents?: number;
}
