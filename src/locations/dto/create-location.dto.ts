import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";   

export class CreateLocationDto {
    @IsNotEmpty()
    @IsInt()
    stock_location_id: number;

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    site_short_code: string;

    @IsOptional()
    @IsString()
    @MaxLength(200)
    description?: string;

    @IsNotEmpty()
    @IsBoolean()
    status: boolean;
}
