import { Type } from "class-transformer";
import { IsInt, IsString, Min, MinLength } from "class-validator";

export class CreateCampaignDto {
  @IsString()
  @MinLength(3)
  title!: string;

  @IsString()
  @MinLength(10)
  description!: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  goalAmountCents!: number;
}
