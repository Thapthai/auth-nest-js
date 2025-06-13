import { PartialType } from '@nestjs/mapped-types';
import { CreateNewLinenDetailDto } from './create-new_linen_detail.dto';

export class UpdateNewLinenDetailDto extends PartialType(CreateNewLinenDetailDto) {}
