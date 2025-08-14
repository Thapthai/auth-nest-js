import { IsBoolean, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreatePaymentTypeDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    name_th: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    name_en: string;

    @IsString()
    @MaxLength(100)
    description: string;

    @IsNotEmpty()
    @IsBoolean()
    status: boolean;
}