import { AnimalSex, AnimalSize, AnimalSpecies, AnimalStatus } from "@anjos/domain";
import { IsBoolean, IsEnum, IsOptional, IsString, MinLength } from "class-validator";

export class CreateAnimalDto {
  @IsString()
  @MinLength(2)
  name!: string;

  @IsEnum(AnimalSpecies)
  species!: AnimalSpecies;

  @IsOptional()
  @IsEnum(AnimalSex)
  sex?: AnimalSex;

  @IsOptional()
  @IsEnum(AnimalSize)
  size?: AnimalSize;

  @IsString()
  @MinLength(2)
  approximateAge!: string;

  @IsString()
  @MinLength(5)
  description!: string;

  @IsOptional()
  @IsString()
  photoUrl?: string | null;

  @IsOptional()
  @IsEnum(AnimalStatus)
  status?: AnimalStatus;

  @IsOptional()
  @IsBoolean()
  specialNeeds?: boolean;
}
