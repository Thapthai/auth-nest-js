import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";   

export class CreateStockLocationDto {
    @IsNotEmpty()
    @IsInt()
    sale_office_id: number;

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    site_short_code: string;

    @IsOptional()
    @IsString()
    @MaxLength(200)
    description?: string;

    @IsNotEmpty()
    @IsBoolean()
    status: boolean;
}
