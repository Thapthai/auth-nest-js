import { PartialType } from '@nestjs/mapped-types';
import { CreateRoundTimeExpressDto } from './create-round_time_express.dto';

export class UpdateRoundTimeExpressDto extends PartialType(CreateRoundTimeExpressDto) {}
