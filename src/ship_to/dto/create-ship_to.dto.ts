import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateShipToDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    site_short_code: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    name_th: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    name_en?: string;

    @IsNotEmpty()
    @IsInt()
    customer_id: number;

    @IsNotEmpty()
    @IsInt()
    ship_to_id: number;

    @IsNotEmpty()
    @IsBoolean()
    status: boolean;
}