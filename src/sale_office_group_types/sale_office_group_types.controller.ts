import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SaleOfficeGroupTypesService } from './sale_office_group_types.service';
import { CreateSaleOfficeGroupTypeDto } from './dto/create-sale_office_group_type.dto';
import { UpdateSaleOfficeGroupTypeDto } from './dto/update-sale_office_group_type.dto';

@Controller('sale-office-group-types')
export class SaleOfficeGroupTypesController {
  constructor(private readonly saleOfficeGroupTypesService: SaleOfficeGroupTypesService) {}

  @Post()
  create(@Body() createSaleOfficeGroupTypeDto: CreateSaleOfficeGroupTypeDto) {
    return this.saleOfficeGroupTypesService.create(createSaleOfficeGroupTypeDto);
  }

  @Get()
  findAll() {
    return this.saleOfficeGroupTypesService.findAll();
  }

  @Get('pagination-with-search')
  findAllWithPagination(
    @Query('page') page: string = '1',
    @Query('pageSize') pageSize: string = '10',
    @Query('keyword') keyword: string = ''
  ) {
    return this.saleOfficeGroupTypesService.findAllWithPagination({
      page: parseInt(page),
      pageSize: parseInt(pageSize),
      keyword
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saleOfficeGroupTypesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSaleOfficeGroupTypeDto: UpdateSaleOfficeGroupTypeDto) {
    return this.saleOfficeGroupTypesService.update(+id, updateSaleOfficeGroupTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saleOfficeGroupTypesService.remove(+id);
  }
}
