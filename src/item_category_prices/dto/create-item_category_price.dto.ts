import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateItemCategoryPriceDto {
    @IsNotEmpty()
    @IsInt()
    item_category_id: number;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsBoolean()
    status: boolean;
}
