import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PaymentTypesService } from './payment_types.service';
import { CreatePaymentTypeDto } from './dto/create-payment_type.dto';
import { UpdatePaymentTypeDto } from './dto/update-payment_type.dto';

@Controller('payment-types')
export class PaymentTypesController {
  constructor(private readonly paymentTypesService: PaymentTypesService) {}

  @Post()
  create(@Body() createPaymentTypeDto: CreatePaymentTypeDto) {
    return this.paymentTypesService.create(createPaymentTypeDto);
  }

  @Get()
  findAll() {
    return this.paymentTypesService.findAll();
  }

  @Get('pagination-with-search')
  findAllWithPagination(
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('keyword') keyword?: string,
  ) {
    return this.paymentTypesService.findAllWithPagination({
      page: page ? Number(page) : undefined,
      pageSize: pageSize ? Number(pageSize) : undefined,
      keyword: keyword?.trim(),
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentTypesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentTypeDto: UpdatePaymentTypeDto) {
    return this.paymentTypesService.update(+id, updatePaymentTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentTypesService.remove(+id);
  }
}
