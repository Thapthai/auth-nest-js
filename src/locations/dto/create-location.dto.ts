import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";   

export class CreateLocationDto {
    @IsNotEmpty()
    @IsInt()
    stock_location_id: number;

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    site_short_code: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    name_th: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    name_en: string;

    @IsOptional()
    @IsString()
    @MaxLength(200)
    description?: string;

    @IsNotEmpty()
    @IsBoolean()
    status: boolean;
}
