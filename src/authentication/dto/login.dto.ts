import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class LoingDTO {
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string
}