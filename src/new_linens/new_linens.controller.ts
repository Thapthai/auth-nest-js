import { Controller, Get, Post, Body, Patch, Param, Delete, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { NewLinensService } from './new_linens.service';
import { CreateNewLinenDto } from './dto/create-new_linen.dto';
import { UpdateNewLinenDto } from './dto/update-new_linen.dto';

@Controller('new-linens')
export class NewLinensController {
  constructor(private readonly newLinensService: NewLinensService) { }

  @Post()
  create(@Body() createNewLinenDto: CreateNewLinenDto) {
    return this.newLinensService.create(createNewLinenDto);
  }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('keyword') keyword?: string,
  ) {
    return this.newLinensService.findPaginated(page, limit, keyword);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newLinensService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNewLinenDto: UpdateNewLinenDto) {
    return this.newLinensService.update(+id, updateNewLinenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newLinensService.remove(+id);
  }
}
