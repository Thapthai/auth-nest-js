import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RoundTimeDirtiesService } from './round_time_dirties.service';
import { CreateRoundTimeDirtyDto } from './dto/create-round_time_dirty.dto';
import { UpdateRoundTimeDirtyDto } from './dto/update-round_time_dirty.dto';

@Controller('round-time-dirties')
export class RoundTimeDirtiesController {
  constructor(private readonly roundTimeDirtiesService: RoundTimeDirtiesService) { }

  @Post()
  create(@Body() createRoundTimeDirtyDto: CreateRoundTimeDirtyDto) {
    return this.roundTimeDirtiesService.create(createRoundTimeDirtyDto);
  }

  @Get()
  findAll() {
    return this.roundTimeDirtiesService.findAll();
  }

  @Get('pagination-with-search')
  findAllRoundTimeDirtiesPagination(
    @Query('page') page = '1',
    @Query('pageSize') pageSize = '10',
    @Query('saleoffice_id') saleoffice_id = ''
  ) {
    return this.roundTimeDirtiesService.findAllRoundTimeDirtiesPagination({
      page: Number(page),
      pageSize: Number(pageSize),
      saleoffice_id: saleoffice_id.trim(),
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roundTimeDirtiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoundTimeDirtyDto: UpdateRoundTimeDirtyDto) {
    return this.roundTimeDirtiesService.update(+id, updateRoundTimeDirtyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roundTimeDirtiesService.remove(+id);
  }
}
