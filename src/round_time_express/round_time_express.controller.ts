import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RoundTimeExpressService } from './round_time_express.service';
import { CreateRoundTimeExpressDto } from './dto/create-round_time_express.dto';
import { UpdateRoundTimeExpressDto } from './dto/update-round_time_express.dto';

@Controller('round-time-express')
export class RoundTimeExpressController {
  constructor(private readonly roundTimeExpressService: RoundTimeExpressService) {}

  @Post()
  create(@Body() createRoundTimeExpressDto: CreateRoundTimeExpressDto) {
    return this.roundTimeExpressService.create(createRoundTimeExpressDto);
  }

  @Get()
  findAll() {
    return this.roundTimeExpressService.findAll();
  }

  @Get('pagination-with-search')
  findAllRoundTimeExpressPagination(
    @Query('page') page = '1',
    @Query('pageSize') pageSize = '10',
    @Query('saleoffice_id') saleoffice_id = ''
  ) {
    return this.roundTimeExpressService.findAllRoundTimeExpressPagination({
      page: Number(page),
      pageSize: Number(pageSize),
      saleoffice_id: saleoffice_id.trim(),
    });
  } 

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roundTimeExpressService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoundTimeExpressDto: UpdateRoundTimeExpressDto) {
    return this.roundTimeExpressService.update(+id, updateRoundTimeExpressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roundTimeExpressService.remove(+id);
  }
}
