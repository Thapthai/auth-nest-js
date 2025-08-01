import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ItemCategoriesService } from './item_categories.service';
import { CreateItemCategoryDto } from './dto/create-item_category.dto';
import { UpdateItemCategoryDto } from './dto/update-item_category.dto';

@Controller('item-categories')
export class ItemCategoriesController {
  constructor(private readonly itemCategoriesService: ItemCategoriesService) {}

  @Post()
  create(@Body() createItemCategoryDto: CreateItemCategoryDto) {
    return this.itemCategoriesService.create(createItemCategoryDto);
  }

  @Get()
  findAll() {
    return this.itemCategoriesService.findAll();
  }

  @Get('pagination-with-search')
  findAllItemCategoriesPagination(
    @Query('page') page = '1',
    @Query('pageSize') pageSize = '10',
    @Query('sale_office_id') sale_office_id = '',
    @Query('department_id') department_id = '',
    @Query('search') search = ''
  ) {
    return this.itemCategoriesService.findAllItemCategoriesPagination({
      page: Number(page),
      pageSize: Number(pageSize),
      sale_office_id: sale_office_id.trim(),
      department_id: department_id.trim(),
      search: search.trim(),
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemCategoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemCategoryDto: UpdateItemCategoryDto) {
    return this.itemCategoriesService.update(+id, updateItemCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemCategoriesService.remove(+id);
  }
}
