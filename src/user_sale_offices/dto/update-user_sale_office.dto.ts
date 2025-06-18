import { PartialType } from '@nestjs/mapped-types';
import { CreateUserSaleOfficeDto } from './create-user_sale_office.dto';

export class UpdateUserSaleOfficeDto extends PartialType(CreateUserSaleOfficeDto) {}
