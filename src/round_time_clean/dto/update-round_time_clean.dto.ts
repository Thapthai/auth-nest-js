import { PartialType } from '@nestjs/mapped-types';
import { CreateRoundTimeCleanDto } from './create-round_time_clean.dto';

export class UpdateRoundTimeCleanDto extends PartialType(CreateRoundTimeCleanDto) {}
