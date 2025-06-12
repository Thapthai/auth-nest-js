import { PartialType } from '@nestjs/mapped-types';
import { CreateDirtyDetailDto } from './create-dirty_detail.dto';

export class UpdateDirtyDetailDto extends PartialType(CreateDirtyDetailDto) {}
