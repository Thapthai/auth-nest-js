import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class ForgotPasswordDTO {
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string
}