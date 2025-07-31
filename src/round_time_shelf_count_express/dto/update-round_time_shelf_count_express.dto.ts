import { PartialType } from '@nestjs/mapped-types';
import { CreateRoundTimeShelfCountExpressDto } from './create-round_time_shelf_count_express.dto';

export class UpdateRoundTimeShelfCountExpressDto extends PartialType(CreateRoundTimeShelfCountExpressDto) {}
