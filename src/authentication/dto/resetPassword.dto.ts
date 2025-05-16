import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class ResetPasswordDTO {
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    token: string

    @IsString()
    @IsNotEmpty()
    newPassword: string
}