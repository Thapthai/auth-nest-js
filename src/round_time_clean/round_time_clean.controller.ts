import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RoundTimeCleanService } from './round_time_clean.service';
import { CreateRoundTimeCleanDto } from './dto/create-round_time_clean.dto';
import { UpdateRoundTimeCleanDto } from './dto/update-round_time_clean.dto';

@Controller('round-time-clean')
export class RoundTimeCleanController {
  constructor(private readonly roundTimeCleanService: RoundTimeCleanService) { }

  @Post()
  create(@Body() createRoundTimeCleanDto: CreateRoundTimeCleanDto) {
    return this.roundTimeCleanService.create(createRoundTimeCleanDto);
  }

  @Get()
  findAll() {
    return this.roundTimeCleanService.findAll();
  }

  @Get('pagination-with-search')
  findAllRoundTimeCleanPagination(
    @Query('page') page = '1',
    @Query('pageSize') pageSize = '10',
    @Query('saleoffice_id') saleoffice_id = ''
  ) {
    return this.roundTimeCleanService.findAllRoundTimeCleanPagination({
      page: Number(page),
      pageSize: Number(pageSize),
      saleoffice_id: saleoffice_id.trim(),
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roundTimeCleanService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoundTimeCleanDto: UpdateRoundTimeCleanDto) {
    return this.roundTimeCleanService.update(+id, updateRoundTimeCleanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roundTimeCleanService.remove(+id);
  }
}
