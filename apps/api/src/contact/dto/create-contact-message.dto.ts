import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class CreateContactMessageDto {
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  name!: string;

  @IsEmail()
  @MaxLength(180)
  email!: string;

  @IsString()
  @MinLength(10)
  @MaxLength(2000)
  message!: string;
}
