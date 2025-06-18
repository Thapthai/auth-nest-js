import { IsBoolean, IsString } from "class-validator";

export class CreateFactorySaleOfficeDto {

    @IsString()
    sale_office_id: number;

    @IsString()
    factory_id: number;

    @IsBoolean()
    status: boolean;

}
