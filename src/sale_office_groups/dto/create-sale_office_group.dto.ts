import { IsInt, IsBoolean, IsString, IsOptional } from 'class-validator';

export class CreateSaleOfficeGroupDto {
    @IsString()
    name_th: string;

    @IsString()
    name_en: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    code?: string;

    @IsInt()
    sale_office_id: number;

    @IsInt()
    sale_office_group_type_id: number;

    @IsBoolean()
    status: boolean;
}
