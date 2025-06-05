import {
    IsInt,
    IsNotEmpty,
    IsString,
} from 'class-validator';


export class CreateTestServiceDto {
    @IsInt()
    user_id: number;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    message: string;

    @IsString()
    @IsNotEmpty()
    type: string;
}
