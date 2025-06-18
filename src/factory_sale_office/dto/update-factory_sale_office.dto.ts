import { PartialType } from '@nestjs/mapped-types';
import { CreateFactorySaleOfficeDto } from './create-factory_sale_office.dto';

export class UpdateFactorySaleOfficeDto extends PartialType(CreateFactorySaleOfficeDto) {}
