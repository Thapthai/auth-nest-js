import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SapSaleService } from './sap_sale.service';
import { CreateSapSaleDto } from './dto/create-sap_sale.dto';
import { UpdateSapSaleDto } from './dto/update-sap_sale.dto';

@Controller('sap-sale')
export class SapSaleController {
  constructor(private readonly sapSaleService: SapSaleService) {}

  @Post()
  create(@Body() createSapSaleDto: CreateSapSaleDto) {
    return this.sapSaleService.create(createSapSaleDto);
  }

  @Get()
  findAll() {
    return this.sapSaleService.findAll();
  }

  @Get('pagination-with-search')
  findAllSapSalePagination(
    @Query('page') page = '1',
    @Query('pageSize') pageSize = '10',
    @Query('search') search = ''
  ) {
    return this.sapSaleService.findAllSapSalePagination({
      page: Number(page),
      pageSize: Number(pageSize),
      search: search.trim(),
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sapSaleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSapSaleDto: UpdateSapSaleDto) {
    return this.sapSaleService.update(+id, updateSapSaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sapSaleService.remove(+id);
  }
}
