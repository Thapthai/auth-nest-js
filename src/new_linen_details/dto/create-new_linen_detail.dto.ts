import { IsBoolean, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateNewLinenDetailDto {
    @IsInt()
    new_linen_id: number;

    @IsInt()
    department_id: number;

    @IsInt()
    item_id: number;

    @IsInt()
    unit_id: number;

    @IsNumber()
    qty: number;

    @IsNumber()
    receive_qty: number;

    @IsNumber()
    weight: number;

    @IsBoolean()
    is_cancel: boolean;

    @IsOptional()
    @IsString()
    description?: string;

    @IsBoolean()
    status: boolean;
}
