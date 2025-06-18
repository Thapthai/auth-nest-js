import { IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreateDirtyDetailRoundDto {
    @IsOptional()
    @IsNumber()
    dirty_detail_id?: number;

    @IsOptional()
    @IsNumber()
    item_id?: number;

    @IsOptional()
    @IsNumber()
    unit_id?: number;

    @IsOptional()
    @IsNumber()
    user_id?: number;

    @IsOptional()
    @IsNumber()
    qty?: number;

    @IsOptional()
    @IsNumber()
    receive_qty?: number;

    @IsOptional()
    @IsNumber()
    weight?: number;

    @IsBoolean()
    is_cancel: boolean;

    @IsBoolean()
    status: boolean;
}
