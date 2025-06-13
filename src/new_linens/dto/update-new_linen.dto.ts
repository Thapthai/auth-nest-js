import { PartialType } from '@nestjs/mapped-types';
import { CreateNewLinenDto } from './create-new_linen.dto';

export class UpdateNewLinenDto extends PartialType(CreateNewLinenDto) {}
