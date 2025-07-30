import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRoundTimeExpressDto {
    @IsNotEmpty()
    @IsNumber()
    sale_office_id: number;


    @IsNotEmpty()
    @IsString()
    time: string;

    @IsNotEmpty()
    @IsBoolean()
    status: boolean;
}
