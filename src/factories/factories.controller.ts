import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FactoriesService, FindAllFactoriesQuery } from './factories.service';
import { CreateFactoryDto } from './dto/create-factory.dto';
import { UpdateFactoryDto } from './dto/update-factory.dto';

@Controller('factories')
export class FactoriesController {
  constructor(private readonly factoriesService: FactoriesService) {}

  @Post()
  create(@Body() createFactoryDto: CreateFactoryDto) {
    return this.factoriesService.create(createFactoryDto);
  }

  @Get()
  findAll(@Query() query?: FindAllFactoriesQuery) {
    // If any pagination parameters are provided, use pagination
    if (query?.page || query?.limit || query?.search) {
      return this.factoriesService.findAllWithPagination(query);
    }
    // Otherwise, return all data
    return this.factoriesService.findAll();
  }

  @Get('paginated')
  findAllPaginated(@Query() query: FindAllFactoriesQuery) {
    return this.factoriesService.findAllWithPagination(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.factoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFactoryDto: UpdateFactoryDto) {
    return this.factoriesService.update(+id, updateFactoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.factoriesService.remove(+id);
  }
}
