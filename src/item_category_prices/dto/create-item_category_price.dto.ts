import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateItemCategoryPriceDto {
    @IsNotEmpty()
    @IsInt()
    item_category_id: number;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsBoolean()
    status: boolean;
}
