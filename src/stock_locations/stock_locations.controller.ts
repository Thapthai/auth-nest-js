import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { StockLocationsService } from './stock_locations.service';
import { CreateStockLocationDto } from './dto/create-stock_location.dto';
import { UpdateStockLocationDto } from './dto/update-stock_location.dto';

@Controller('stock-locations')
export class StockLocationsController {
  constructor(private readonly stockLocationsService: StockLocationsService) {}

  @Post()
  create(@Body() createStockLocationDto: CreateStockLocationDto) {
    return this.stockLocationsService.create(createStockLocationDto);
  }

  @Get()
  findAll() {
    return this.stockLocationsService.findAll();
  }

  @Get('pagination-with-search')
  findAllStockLocationPagination(
    @Query('page') page = '1',
    @Query('pageSize') pageSize = '10',
    @Query('keyword') keyword = '',
  ) {
    return this.stockLocationsService.findAllStockLocationPagination({
      page: Number(page),
      pageSize: Number(pageSize),
      keyword: keyword.trim(),
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockLocationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockLocationDto: UpdateStockLocationDto) {
    return this.stockLocationsService.update(+id, updateStockLocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockLocationsService.remove(+id);
  }
}
