import { PartialType } from '@nestjs/mapped-types';
import { CreateItemCategoryPriceDto } from './create-item_category_price.dto';

export class UpdateItemCategoryPriceDto extends PartialType(CreateItemCategoryPriceDto) {}
