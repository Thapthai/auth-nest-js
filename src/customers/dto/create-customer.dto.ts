import { IsBoolean, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateCustomerDto {
    @IsOptional()
    @IsInt()
    customer_group_id?: number;

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    site_short_code: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    name_th: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    name_en: string;

    @IsOptional()
    @IsInt()
    sale_office_id?: number;

    @IsOptional()
    @IsInt()
    department_id?: number;

    @IsOptional()
    @IsInt()
    payment_type_id?: number;

    @IsOptional()
    @IsString()
    @MaxLength(300)
    address: string;

    @IsOptional()
    @IsString()
    @MaxLength(20)
    tel: string;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    tax_no: string;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    tax_id: string;

    @IsOptional()
    @IsString()
    @MaxLength(20)
    tax_id_type: string;

    @IsOptional()
    @IsString()
    @MaxLength(200)
    remark?: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsBoolean()
    status: boolean;
}