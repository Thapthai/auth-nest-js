import { IsBoolean, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateStockLocationDto {
    @IsNotEmpty()
    @IsInt()
    department_id: number;

    @IsNotEmpty()
    @IsInt()
    sale_office_id: number;

    @IsNotEmpty()
    @IsInt()
    site_short_code: number;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsBoolean()
    status: boolean;
}
