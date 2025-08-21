import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ShipTosService } from './ship_tos.service';
import { CreateShipToDto } from './dto/create-ship_to.dto';
import { UpdateShipToDto } from './dto/update-ship_to.dto';

@Controller('ship-tos')
export class ShipTosController {
  constructor(private readonly shipTosService: ShipTosService) {}

  @Post()
  create(@Body() createShipToDto: CreateShipToDto) {
    return this.shipTosService.create(createShipToDto);
  }

  @Get()
  findAll() {
    return this.shipTosService.findAll();
  }

  @Get('pagination-with-search')
  findAllWithPagination(
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('keyword') keyword?: string,
  ) {
    return this.shipTosService.findAllWithPagination({
      page: page ? Number(page) : undefined,
      pageSize: pageSize ? Number(pageSize) : undefined,
      keyword: keyword?.trim(),
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shipTosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShipToDto: UpdateShipToDto) {
    return this.shipTosService.update(+id, updateShipToDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shipTosService.remove(+id);
  }
}
