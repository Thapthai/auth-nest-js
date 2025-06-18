import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FactorySaleOfficeService } from './factory_sale_office.service';
import { CreateFactorySaleOfficeDto } from './dto/create-factory_sale_office.dto';
import { UpdateFactorySaleOfficeDto } from './dto/update-factory_sale_office.dto';

@Controller('factory-sale-office')
export class FactorySaleOfficeController {
  constructor(private readonly factorySaleOfficeService: FactorySaleOfficeService) {}

  @Post()
  create(@Body() createFactorySaleOfficeDto: CreateFactorySaleOfficeDto) {
    return this.factorySaleOfficeService.create(createFactorySaleOfficeDto);
  }

  @Get()
  findAll() {
    return this.factorySaleOfficeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.factorySaleOfficeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFactorySaleOfficeDto: UpdateFactorySaleOfficeDto) {
    return this.factorySaleOfficeService.update(+id, updateFactorySaleOfficeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.factorySaleOfficeService.remove(+id);
  }
}
