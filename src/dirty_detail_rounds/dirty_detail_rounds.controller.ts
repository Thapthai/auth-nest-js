import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DirtyDetailRoundsService } from './dirty_detail_rounds.service';
import { CreateDirtyDetailRoundDto } from './dto/create-dirty_detail_round.dto';
import { UpdateDirtyDetailRoundDto } from './dto/update-dirty_detail_round.dto';

@Controller('dirty-detail-rounds')
export class DirtyDetailRoundsController {
  constructor(private readonly dirtyDetailRoundsService: DirtyDetailRoundsService) { }

  @Post()
  create(@Body() createDirtyDetailRoundDto: CreateDirtyDetailRoundDto) {
    return this.dirtyDetailRoundsService.create(createDirtyDetailRoundDto);
  }

  @Get()
  findAll(@Query('dirty_detail_id') dirtyDetailIdParam?: string) {
    const dirty_detail_id = dirtyDetailIdParam ? parseInt(dirtyDetailIdParam, 10) : undefined;
    return this.dirtyDetailRoundsService.findAll(dirty_detail_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dirtyDetailRoundsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDirtyDetailRoundDto: UpdateDirtyDetailRoundDto) {
    return this.dirtyDetailRoundsService.update(+id, updateDirtyDetailRoundDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dirtyDetailRoundsService.remove(+id);
  }
}
