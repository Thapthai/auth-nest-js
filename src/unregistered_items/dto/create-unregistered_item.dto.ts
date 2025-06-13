import { IsBoolean, IsInt, IsString } from 'class-validator';

export class CreateUnregisteredItemDto {
    @IsInt()
    item_id: number;

    @IsString()
    name: string;

    @IsString()
    type_linen: string;

    @IsInt()
    type_linen_id: number;

    @IsBoolean()
    status: boolean;
}
