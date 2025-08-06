import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SaleOfficeGroupsService } from './sale_office_groups.service';
import { CreateSaleOfficeGroupDto } from './dto/create-sale_office_group.dto';
import { UpdateSaleOfficeGroupDto } from './dto/update-sale_office_group.dto';

@Controller('sale-office-groups')
export class SaleOfficeGroupsController {
  constructor(private readonly saleOfficeGroupsService: SaleOfficeGroupsService) {}

  @Post()
  create(@Body() createSaleOfficeGroupDto: CreateSaleOfficeGroupDto) {
    return this.saleOfficeGroupsService.create(createSaleOfficeGroupDto);
  }

  @Get()
  findAll() {
    return this.saleOfficeGroupsService.findAll();
  }

  @Get('pagination-with-search')
  findAllWithPagination(
    @Query('page') page: string = '1',
    @Query('pageSize') pageSize: string = '10',
    @Query('keyword') keyword: string = ''
  ) {
    return this.saleOfficeGroupsService.findAllWithPagination({
      page: parseInt(page),
      pageSize: parseInt(pageSize),
      keyword
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saleOfficeGroupsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSaleOfficeGroupDto: UpdateSaleOfficeGroupDto) {
    return this.saleOfficeGroupsService.update(+id, updateSaleOfficeGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saleOfficeGroupsService.remove(+id);
  }
}
