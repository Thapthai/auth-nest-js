import { PartialType } from '@nestjs/mapped-types';
import { CreateRoundTimeDirtyDto } from './create-round_time_dirty.dto';

export class UpdateRoundTimeDirtyDto extends PartialType(CreateRoundTimeDirtyDto) {}
