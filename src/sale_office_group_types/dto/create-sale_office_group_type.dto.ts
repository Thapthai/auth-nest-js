import { IsString, IsBoolean } from 'class-validator';

export class CreateSaleOfficeGroupTypeDto {
    @IsString()
    level: string;

    @IsString()
    group: string;

    @IsString()
    type: string;

    @IsBoolean()
    status: boolean;
}
