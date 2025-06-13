import { IsString, IsDateString, IsInt, IsBoolean, IsOptional, IsNumber } from 'class-validator';

export class CreateNewLinenDto {
    // @IsString()
    // doc_no: string;

    // @IsDateString()
    // doc_date: string;

    // @IsOptional()
    // @IsString()
    // ref_doc_no?: string;

    // @IsInt()
    // sale_office_id: number;

    @IsInt()
    department_id: number;

    @IsNumber()
    total: number;

    // @IsOptional()
    // @IsBoolean()
    // is_recive?: boolean;

    // @IsOptional()
    // @IsDateString()
    // receive_date?: string;

    // @IsOptional()
    // @IsString()
    // receive_detail?: string;

    // @IsOptional()
    // @IsBoolean()
    // is_process?: boolean;

    // @IsOptional()
    // @IsString()
    // sign_factory?: string;

    // @IsOptional()
    // @IsString()
    // sign_NH?: string;

    // @IsOptional()
    // @IsDateString()
    // sign_factory_time?: string;

    // @IsOptional()
    // @IsDateString()
    // sign_NH_time?: string;

    @IsInt()
    factory_id: number;

    // @IsBoolean()
    // status: boolean;
}
