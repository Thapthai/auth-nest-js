import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateSapSaleDto {
    @IsNotEmpty()
    @IsString()
    code: string;


    @IsString()
    description: string;

    @IsNotEmpty()
    @IsBoolean()
    status: boolean;
}
