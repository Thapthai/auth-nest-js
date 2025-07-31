import { IsBoolean, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateRoundTimeFactoryDto {
    @IsNotEmpty()
    @IsInt()
    factory_id: number;

    @IsNotEmpty()
    @IsString()
    time: string;

    @IsNotEmpty()
    @IsBoolean()
    status: boolean;
}
