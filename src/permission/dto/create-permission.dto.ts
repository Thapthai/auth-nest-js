import { IsInt, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePermissionDto {

    @IsString()
    name_th: string;

    @IsString()
    name_en: string;

    @IsString()
    @IsOptional()
    description: string;
}
