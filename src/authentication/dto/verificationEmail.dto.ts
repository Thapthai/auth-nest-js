import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class VerificationEmailDTO {
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    token: string
}