import { PartialType } from '@nestjs/mapped-types';
import { CreateUnregisteredItemDto } from './create-unregistered_item.dto';

export class UpdateUnregisteredItemDto extends PartialType(CreateUnregisteredItemDto) {}
