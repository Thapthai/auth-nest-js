import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsInt, MaxLength } from 'class-validator';

export class CreateShipToDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    ship_to_code: string;

    @IsInt()
    @IsNotEmpty()
    sale_office_customer_id: number;

    @IsString()
    @IsOptional()
    @MaxLength(200)
    description?: string;

    @IsBoolean()
    @IsOptional()
    status?: boolean;
}
