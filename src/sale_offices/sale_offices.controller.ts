import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SaleOfficesService } from './sale_offices.service';
import { CreateSaleOfficeDto } from './dto/create-sale_office.dto';
import { UpdateSaleOfficeDto } from './dto/update-sale_office.dto';

@Controller('sale-offices')
export class SaleOfficesController {
  constructor(private readonly saleOfficesService: SaleOfficesService) { }

  @Post()
  create(@Body() createSaleOfficeDto: CreateSaleOfficeDto) {
    return this.saleOfficesService.create(createSaleOfficeDto);
  }

  // @Get()
  // findAll() {
  //   return this.saleOfficesService.findAll();
  // }

  @Get()
  findAll(
    @Query('page') page = '1',
    @Query('pageSize') pageSize = '10',
    @Query('keyword') keyword = ''
  ) {
    return this.saleOfficesService.findAllWithPagination({
      page: Number(page),
      pageSize: Number(pageSize),
      keyword: keyword.trim(),
    });
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saleOfficesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSaleOfficeDto: UpdateSaleOfficeDto) {
    return this.saleOfficesService.update(+id, updateSaleOfficeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saleOfficesService.remove(+id);
  }
}
