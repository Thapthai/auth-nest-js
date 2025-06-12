import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { DirtiesService } from './dirties.service';
import { CreateDirtyDto } from './dto/create-dirty.dto';
import { UpdateDirtyDto } from './dto/update-dirty.dto';
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard';

// @UseGuards(JwtAuthGuard)
@Controller('dirties')
export class DirtiesController {
  constructor(private readonly dirtiesService: DirtiesService) { }

  @Post()
  create(@Body() createDirtyDto: CreateDirtyDto) {
    return this.dirtiesService.create(createDirtyDto);
  }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('keyword') keyword?: string,
  ) {
    return this.dirtiesService.findPaginated(page, limit, keyword);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dirtiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDirtyDto: UpdateDirtyDto) {
    return this.dirtiesService.update(+id, updateDirtyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dirtiesService.remove(+id);
  }
}

