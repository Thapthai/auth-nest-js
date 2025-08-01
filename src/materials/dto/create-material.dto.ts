import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateMaterialDto {
    @IsNotEmpty()
    @IsString()
    material_code: string;

    @IsNotEmpty()
    @IsString()
    material_name_th: string;

    @IsNotEmpty()
    @IsString()
    material_name_en: string;

    @IsNotEmpty()
    @IsString()
    long_meterial_name: string;

    @IsNotEmpty()
    @IsInt()
    material_type_id: number;

    @IsOptional()
    @IsInt()
    sap_sale_id?: number;

    @IsString()
    description: string;

    @IsNotEmpty()
    @IsBoolean()
    status: boolean;
}
