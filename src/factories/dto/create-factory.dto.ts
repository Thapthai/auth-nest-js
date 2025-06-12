import { IsString, IsBoolean, IsInt, IsNumber } from 'class-validator';

export class CreateFactoryDto {
    @IsNumber()
    price: number;

    @IsString()
    address: string;

    @IsString()
    post: string;

    @IsString()
    tel: string;

    @IsInt()
    tax_id: number;

    @IsString()
    name_th: string;

    @IsString()
    name_en: string;

    @IsBoolean()
    status: boolean;
}
