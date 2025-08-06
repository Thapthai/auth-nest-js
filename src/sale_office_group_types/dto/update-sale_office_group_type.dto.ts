import { PartialType } from '@nestjs/mapped-types';
import { CreateSaleOfficeGroupTypeDto } from './create-sale_office_group_type.dto';

export class UpdateSaleOfficeGroupTypeDto extends PartialType(CreateSaleOfficeGroupTypeDto) {}
