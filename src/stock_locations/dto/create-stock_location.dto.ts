import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";   

export class CreateStockLocationDto {
    @IsNotEmpty()
    @IsInt()
    sale_office_id: number;

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    site_short_code: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    name_th: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    name_en: string;

    @IsOptional()
    @IsString()
    @MaxLength(200)
    description?: string;

    @IsNotEmpty()
    @IsBoolean()
    status: boolean;
}
