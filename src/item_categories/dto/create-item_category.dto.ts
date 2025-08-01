import { IsBoolean, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateItemCategoryDto {
    @IsNotEmpty()
    @IsInt()
    material_id: number;

    @IsNotEmpty()
    @IsString()
    name_th: string;

    @IsNotEmpty()
    @IsString()
    name_en: string;

    @IsNotEmpty()
    @IsInt()
    department_id: number;

    @IsInt()
    stock_location_id: number;

    @IsString()
    description: string;

    @IsNotEmpty()
    @IsInt()
    sale_office_id: number;

    @IsNotEmpty()
    @IsBoolean()
    status: boolean;
}
