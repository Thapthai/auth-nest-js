import { IsString, IsBoolean } from 'class-validator';

export class CreateSaleOfficeDto {

    @IsString()
    site_code: string;

    @IsString()
    site_office_name_th: string;

    @IsString()
    site_office_name_en: string;

    @IsBoolean()
    status: boolean;

}
