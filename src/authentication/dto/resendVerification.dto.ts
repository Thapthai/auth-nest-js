import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class ResendVerificationDTO {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string
}