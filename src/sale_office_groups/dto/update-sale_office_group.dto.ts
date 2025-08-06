import { PartialType } from '@nestjs/mapped-types';
import { CreateSaleOfficeGroupDto } from './create-sale_office_group.dto';

export class UpdateSaleOfficeGroupDto extends PartialType(CreateSaleOfficeGroupDto) {}
