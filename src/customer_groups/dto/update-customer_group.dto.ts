import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerGroupDto } from './create-customer_group.dto';

export class UpdateCustomerGroupDto extends PartialType(CreateCustomerGroupDto) {}
