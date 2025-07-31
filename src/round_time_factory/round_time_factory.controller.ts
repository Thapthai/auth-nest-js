import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RoundTimeFactoryService } from './round_time_factory.service';
import { CreateRoundTimeFactoryDto } from './dto/create-round_time_factory.dto';
import { UpdateRoundTimeFactoryDto } from './dto/update-round_time_factory.dto';

@Controller('round-time-factory')
export class RoundTimeFactoryController {
  constructor(private readonly roundTimeFactoryService: RoundTimeFactoryService) { }

  @Post()
  create(@Body() createRoundTimeFactoryDto: CreateRoundTimeFactoryDto) {
    return this.roundTimeFactoryService.create(createRoundTimeFactoryDto);
  }

  @Get()
  findAll() {
    return this.roundTimeFactoryService.findAll();
  }

  @Get('pagination-with-search')
  findAllRoundTimeFactoryPagination(
    @Query('page') page = '1',
    @Query('pageSize') pageSize = '10',
    @Query('factory_id') factory_id = ''
  ) {
    return this.roundTimeFactoryService.findAllRoundTimeFactoryPagination({
      page: Number(page),
      pageSize: Number(pageSize),
      factory_id: factory_id.trim(),
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roundTimeFactoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoundTimeFactoryDto: UpdateRoundTimeFactoryDto) {
    return this.roundTimeFactoryService.update(+id, updateRoundTimeFactoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roundTimeFactoryService.remove(+id);
  }
}
