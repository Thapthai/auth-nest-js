import { PartialType } from '@nestjs/mapped-types';
import { CreateRoundTimeFactoryDto } from './create-round_time_factory.dto';

export class UpdateRoundTimeFactoryDto extends PartialType(CreateRoundTimeFactoryDto) {}
