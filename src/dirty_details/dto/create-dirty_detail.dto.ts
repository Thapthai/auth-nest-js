import {
    IsInt,
    IsNumber,
    IsBoolean
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

    @IsBoolean()
    is_cancel: boolean;

    @IsBoolean()
    status: boolean;
}
