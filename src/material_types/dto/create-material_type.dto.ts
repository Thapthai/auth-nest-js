import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateMaterialTypeDto {
    @IsNotEmpty()
    @IsString()
    name_th: string;

    @IsNotEmpty()
    @IsString()
    name_en: string;

    @IsString()
    description: string;

    @IsNotEmpty()
    @IsBoolean()
    status: boolean;
}
