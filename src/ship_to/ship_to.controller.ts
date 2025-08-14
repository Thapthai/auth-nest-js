import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ShipToService } from './ship_to.service';
import { CreateShipToDto } from './dto/create-ship_to.dto';
import { UpdateShipToDto } from './dto/update-ship_to.dto';

@Controller('ship-to')
export class ShipToController {
  constructor(private readonly shipToService: ShipToService) {}

  @Post()
  create(@Body() createShipToDto: CreateShipToDto) {
    return this.shipToService.create(createShipToDto);
  }

  @Get()
  findAll() {
    return this.shipToService.findAll();
  }

  @Get('search')
  findAllWithPagination(
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('keyword') keyword?: string,
  ) {
    return this.shipToService.findAllWithPagination({
      page: page ? Number(page) : undefined,
      pageSize: pageSize ? Number(pageSize) : undefined,
      keyword: keyword?.trim(),
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shipToService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShipToDto: UpdateShipToDto) {
    return this.shipToService.update(+id, updateShipToDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shipToService.remove(+id);
  }
}
