import {
    IsString,
    IsInt,
    IsBoolean,
} from 'class-validator';

export class CreateDepartmentDto {
    @IsString()
    department_code: string;

    @IsInt()
    sale_office_id: number;

    @IsString()
    description: string;

    @IsString()
    group_code: string;

    @IsInt()
    ship_id: number;

    @IsBoolean()
    is_default: boolean;

    @IsString()
    name_th: string;

    @IsString()
    name_en: string;

    @IsBoolean()
    status: boolean;
}
