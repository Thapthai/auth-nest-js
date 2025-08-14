import { IsBoolean, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateCustomerGroupDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    name_th: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    name_en: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    level1: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    level2: string;

    @IsNotEmpty()
    @IsBoolean()
    status: boolean;

    @IsString()
    @MaxLength(100)
    description?: string;
}