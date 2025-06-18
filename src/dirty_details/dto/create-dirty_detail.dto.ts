import {
    IsInt,
    IsNumber,
    IsBoolean,
    IsOptional
} from 'class-validator';

export class CreateDirtyDetailDto {
    @IsInt()
    dirty_id: number;

    @IsInt()
    department_id: number;

    @IsInt()
    item_id: number;

    @IsInt()
    unit_id: number;

    @IsInt()
    user_id: number;

    @IsNumber()
    qty: number;

    @IsNumber()
    receive_qty: number;

    @IsNumber()
    weight: number;

    @IsOptional()
    @IsNumber()
    unregistered_item_id: number;

    @IsBoolean()
    is_cancel: boolean;

    @IsBoolean()
    status: boolean;
}
