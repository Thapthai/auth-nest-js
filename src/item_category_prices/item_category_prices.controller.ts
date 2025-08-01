import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ItemCategoryPricesService } from './item_category_prices.service';
import { CreateItemCategoryPriceDto } from './dto/create-item_category_price.dto';
import { UpdateItemCategoryPriceDto } from './dto/update-item_category_price.dto';

@Controller('item-category-prices')
export class ItemCategoryPricesController {
  constructor(private readonly itemCategoryPricesService: ItemCategoryPricesService) {}

  @Post()
  create(@Body() createItemCategoryPriceDto: CreateItemCategoryPriceDto) {
    return this.itemCategoryPricesService.create(createItemCategoryPriceDto);
  }

  @Get()
  findAll() {
    return this.itemCategoryPricesService.findAll();
  }

  @Get('pagination-with-search')
  findAllItemCategoryPricesPagination(
    @Query('page') page = '1',
    @Query('pageSize') pageSize = '10',
    @Query('item_category_id') item_category_id = '',
    @Query('search') search = ''
  ) {
    return this.itemCategoryPricesService.findAllItemCategoryPricesPagination({
      page: Number(page),
      pageSize: Number(pageSize),
      item_category_id: item_category_id.trim(),
      search: search.trim(),
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemCategoryPricesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemCategoryPriceDto: UpdateItemCategoryPriceDto) {
    return this.itemCategoryPricesService.update(+id, updateItemCategoryPriceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemCategoryPricesService.remove(+id);
  }
}
