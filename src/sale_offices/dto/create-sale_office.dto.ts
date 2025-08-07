import { IsString, IsBoolean, MaxLength } from 'class-validator';

export class CreateSaleOfficeDto {

    @IsString()
    @MaxLength(50, { message: 'Sale office code must not exceed 50 characters' })
    sale_office_code: string;

    @IsString()
    @MaxLength(50, { message: 'Thai name must not exceed 50 characters' })
    name_th: string;

    @IsString()
    @MaxLength(50, { message: 'English name must not exceed 50 characters' })
    name_en: string;

    @IsString()
    @MaxLength(50, { message: 'Site path must not exceed 50 characters' })
    site_path: string;

    @IsString()
    @MaxLength(50, { message: 'Lab site code must not exceed 50 characters' })
    lab_site_code: string;

    @IsBoolean()
    status: boolean;

}
