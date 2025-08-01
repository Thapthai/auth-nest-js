import { PartialType } from '@nestjs/mapped-types';
import { CreateMaterialTypeDto } from './create-material_type.dto';

export class UpdateMaterialTypeDto extends PartialType(CreateMaterialTypeDto) {}
