import { IsBoolean, IsInt } from "class-validator";

export class CreateFactorySaleOfficeDto {

    @IsInt()
    sale_office_id: number;

    @IsInt()
    factory_id: number;

    @IsBoolean()
    status: boolean;

}
