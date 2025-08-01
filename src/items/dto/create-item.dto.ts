import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateItemDto {
    @IsOptional()
    @IsInt()
    material_id?: number;

    @IsNotEmpty()
    @IsInt()
    saleoffice_id: number;

    @IsNotEmpty()
    @IsInt()
    department_id: number;

    @IsOptional()
    @IsInt()
    item_category_id?: number;

    @IsInt()
    stock_location_id: number;

 
    @IsOptional()
    @IsString()
    rfid_number?: string;

    @IsOptional()
    @IsString()
    name_th?: string;

    @IsOptional()
    @IsString()
    name_en?: string;
    

    @IsNotEmpty()
    @IsBoolean()
    status: boolean;
}
