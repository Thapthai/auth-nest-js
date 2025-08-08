import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";   

export class CreateStockLocationDto {
    @IsNotEmpty()
    @IsInt()
    department_id: number;

    @IsNotEmpty()
    @IsInt()
    sale_office_id: number;

    @IsNotEmpty()
    @IsString()
    site_short_code: string;


    @IsOptional()
    @IsString()
    description?: string;

    @IsNotEmpty()
    @IsBoolean()
    status: boolean;
}
