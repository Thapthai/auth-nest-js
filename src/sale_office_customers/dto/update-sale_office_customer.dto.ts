import { PartialType } from '@nestjs/mapped-types';
import { CreateSaleOfficeCustomerDto } from './create-sale_office_customer.dto';

export class UpdateSaleOfficeCustomerDto extends PartialType(CreateSaleOfficeCustomerDto) {}
