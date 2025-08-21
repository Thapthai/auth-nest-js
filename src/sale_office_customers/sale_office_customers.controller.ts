import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SaleOfficeCustomersService } from './sale_office_customers.service';
import { CreateSaleOfficeCustomerDto } from './dto/create-sale_office_customer.dto';
import { UpdateSaleOfficeCustomerDto } from './dto/update-sale_office_customer.dto';

@Controller('sale-office-customers')
export class SaleOfficeCustomersController {
  constructor(private readonly saleOfficeCustomersService: SaleOfficeCustomersService) {}

  @Post()
  create(@Body() createSaleOfficeCustomerDto: CreateSaleOfficeCustomerDto) {
    return this.saleOfficeCustomersService.create(createSaleOfficeCustomerDto);
  }

  @Get()
  findAll() {
    return this.saleOfficeCustomersService.findAll();
  }

  @Get('pagination-with-search')
  findAllWithPagination(
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('keyword') keyword?: string,
  ) {
    return this.saleOfficeCustomersService.findAllWithPagination({
      page: page ? Number(page) : undefined,
      pageSize: pageSize ? Number(pageSize) : undefined,
      keyword: keyword?.trim(),
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saleOfficeCustomersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSaleOfficeCustomerDto: UpdateSaleOfficeCustomerDto) {
    return this.saleOfficeCustomersService.update(+id, updateSaleOfficeCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saleOfficeCustomersService.remove(+id);
  }
}
