import { PartialType } from '@nestjs/mapped-types';
import { CreateShipToDto } from './create-ship_to.dto';

export class UpdateShipToDto extends PartialType(CreateShipToDto) {}
