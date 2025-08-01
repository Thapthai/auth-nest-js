import { PartialType } from '@nestjs/mapped-types';
import { CreateSapSaleDto } from './create-sap_sale.dto';

export class UpdateSapSaleDto extends PartialType(CreateSapSaleDto) {}
