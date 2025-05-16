import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class twoFAEnableDTO {

    @IsNotEmpty()
    userId: number

    @IsNotEmpty()
    is_two_factor_enabled: boolean

}