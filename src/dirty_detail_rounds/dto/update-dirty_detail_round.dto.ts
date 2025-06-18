import { PartialType } from '@nestjs/mapped-types';
import { CreateDirtyDetailRoundDto } from './create-dirty_detail_round.dto';

export class UpdateDirtyDetailRoundDto extends PartialType(CreateDirtyDetailRoundDto) {}
