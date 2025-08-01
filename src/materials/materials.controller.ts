import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MaterialsService } from './materials.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';

@Controller('materials')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Post()
  create(@Body() createMaterialDto: CreateMaterialDto) {
    return this.materialsService.create(createMaterialDto);
  }

  @Get()
  findAll() {
    return this.materialsService.findAll();
  }

  @Get('pagination-with-search')
  findAllMaterialsPagination(
    @Query('page') page = '1',
    @Query('pageSize') pageSize = '10',
    @Query('material_type_id') material_type_id = '',
    @Query('sap_sale_id') sap_sale_id = '',
    @Query('search') search = ''
  ) {
    return this.materialsService.findAllMaterialsPagination({
      page: Number(page),
      pageSize: Number(pageSize),
      material_type_id: material_type_id.trim(),
      sap_sale_id: sap_sale_id.trim(),
      search: search.trim(),
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.materialsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMaterialDto: UpdateMaterialDto) {
    return this.materialsService.update(+id, updateMaterialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.materialsService.remove(+id);
  }
}
