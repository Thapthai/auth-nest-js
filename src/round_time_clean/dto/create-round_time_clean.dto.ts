import { IsBoolean, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateRoundTimeCleanDto {
    @IsNotEmpty()
    @IsInt()
    sale_office_id: number;

    @IsNotEmpty()
    @IsString()
    time: string;

    @IsNotEmpty()
    @IsBoolean()
    status: boolean;
}
