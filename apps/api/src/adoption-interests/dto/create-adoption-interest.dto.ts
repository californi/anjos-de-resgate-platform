import { IsOptional, IsString, MinLength } from "class-validator";

export class CreateAdoptionInterestDto {
  @IsString()
  @MinLength(2)
  animalId!: string;

  @IsString()
  @MinLength(2)
  requesterName!: string;

  @IsString()
  @MinLength(5)
  contact!: string;

  @IsOptional()
  @IsString()
  message?: string | null;
}
