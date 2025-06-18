import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateUserSaleOfficeDto {
    @IsInt()
    user_id: number;

    @IsInt()
    sale_office_id: number;

    @IsOptional()
    @IsString()
    role?: string;
}
