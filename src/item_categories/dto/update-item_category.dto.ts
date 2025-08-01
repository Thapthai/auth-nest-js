import { PartialType } from '@nestjs/mapped-types';
import { CreateItemCategoryDto } from './create-item_category.dto';

export class UpdateItemCategoryDto extends PartialType(CreateItemCategoryDto) {}
