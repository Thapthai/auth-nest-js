import { PartialType } from '@nestjs/mapped-types';
import { CreateSaleOfficeDto } from './create-sale_office.dto';

export class UpdateSaleOfficeDto extends PartialType(CreateSaleOfficeDto) {}
