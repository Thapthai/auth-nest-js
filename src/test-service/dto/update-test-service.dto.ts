import { PartialType } from '@nestjs/mapped-types';
import { CreateTestServiceDto } from './create-test-service.dto';

export class UpdateTestServiceDto extends PartialType(CreateTestServiceDto) {}
