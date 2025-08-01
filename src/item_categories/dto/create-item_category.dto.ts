import { IsBoolean, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateItemCategoryDto {
    @IsNotEmpty()
    @IsInt()
    type_id: number;

    @IsNotEmpty()
    @IsInt()
    sale_office_id: number;

    @IsNotEmpty()
    @IsInt()
    department_id: number;

    @IsNotEmpty()
    @IsInt()
    stock_location_id: number;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsBoolean()
    status: boolean;
}
