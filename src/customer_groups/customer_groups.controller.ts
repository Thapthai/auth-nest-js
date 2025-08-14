import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CustomerGroupsService } from './customer_groups.service';
import { CreateCustomerGroupDto } from './dto/create-customer_group.dto';
import { UpdateCustomerGroupDto } from './dto/update-customer_group.dto';

@Controller('customer-groups')
export class CustomerGroupsController {
  constructor(private readonly customerGroupsService: CustomerGroupsService) { }

  @Post()
  create(@Body() createCustomerGroupDto: CreateCustomerGroupDto) {
    return this.customerGroupsService.create(createCustomerGroupDto);
  }

  @Get()
  findAll() {
    return this.customerGroupsService.findAll();
  }

  @Get('pagination-with-search')
  findAllWithPagination(
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('keyword') keyword?: string,
  ) {
    return this.customerGroupsService.findAllWithPagination({
      page: page ? Number(page) : undefined,
      pageSize: pageSize ? Number(pageSize) : undefined,
      keyword: keyword?.trim(),
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerGroupsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerGroupDto: UpdateCustomerGroupDto) {
    return this.customerGroupsService.update(+id, updateCustomerGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerGroupsService.remove(+id);
  }
}
