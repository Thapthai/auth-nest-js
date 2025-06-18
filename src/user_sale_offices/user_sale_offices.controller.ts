import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UserSaleOfficesService } from './user_sale_offices.service';
import { CreateUserSaleOfficeDto } from './dto/create-user_sale_office.dto';
import { UpdateUserSaleOfficeDto } from './dto/update-user_sale_office.dto';

@Controller('user-sale-offices')
export class UserSaleOfficesController {
  constructor(private readonly userSaleOfficesService: UserSaleOfficesService) { }

  @Post()
  create(@Body() createUserSaleOfficeDto: CreateUserSaleOfficeDto) {
    return this.userSaleOfficesService.create(createUserSaleOfficeDto);
  }

  @Get()
  findAll() {
    return this.userSaleOfficesService.findAll();
  }

  @Get('user/:userId/sale-offices')
  getSaleOfficesForUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.userSaleOfficesService.findSaleOfficesByUserId(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userSaleOfficesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserSaleOfficeDto: UpdateUserSaleOfficeDto) {
    return this.userSaleOfficesService.update(+id, updateUserSaleOfficeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userSaleOfficesService.remove(+id);
  }
}
