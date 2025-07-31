import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RoundTimeShelfCountExpressService } from './round_time_shelf_count_express.service';
import { CreateRoundTimeShelfCountExpressDto } from './dto/create-round_time_shelf_count_express.dto';
import { UpdateRoundTimeShelfCountExpressDto } from './dto/update-round_time_shelf_count_express.dto';

@Controller('round-time-shelf-count-express')
export class RoundTimeShelfCountExpressController {
  constructor(private readonly roundTimeShelfCountExpressService: RoundTimeShelfCountExpressService) { }

  @Post()
  create(@Body() createRoundTimeShelfCountExpressDto: CreateRoundTimeShelfCountExpressDto) {
    return this.roundTimeShelfCountExpressService.create(createRoundTimeShelfCountExpressDto);
  }

  @Get()
  findAll() {
    return this.roundTimeShelfCountExpressService.findAll();
  }

  @Get('pagination-with-search')
  findAllRoundTimeShelfCountExpressPagination(
    @Query('page') page = '1',
    @Query('pageSize') pageSize = '10',
    @Query('saleoffice_id') saleoffice_id = ''
  ) {
    return this.roundTimeShelfCountExpressService.findAllRoundTimeShelfCountExpressPagination({
      page: Number(page),
      pageSize: Number(pageSize),
      saleoffice_id: saleoffice_id.trim(),
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roundTimeShelfCountExpressService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoundTimeShelfCountExpressDto: UpdateRoundTimeShelfCountExpressDto) {
    return this.roundTimeShelfCountExpressService.update(+id, updateRoundTimeShelfCountExpressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roundTimeShelfCountExpressService.remove(+id);
  }
}
