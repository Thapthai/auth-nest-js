import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from "../authentication/jwt-auth.guard";
import { TestServiceService } from './test-service.service';
import { CreateTestServiceDto } from './dto/create-test-service.dto';
import { UpdateTestServiceDto } from './dto/update-test-service.dto';

@Controller('test-service')
export class TestServiceController {
  constructor(private readonly testServiceService: TestServiceService) { }

  @Post()
  create(@Body() createTestServiceDto: CreateTestServiceDto) {
    return this.testServiceService.create(createTestServiceDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Post(':userId')
  testNotifyToUser(
    @Param('userId') userId: string,
    @Body() createTestServiceDto: CreateTestServiceDto
  ) {
    return this.testServiceService.testNotifyToUser(userId, createTestServiceDto);
  }

  @Get()
  findAll() {
    return this.testServiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testServiceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestServiceDto: UpdateTestServiceDto) {
    return this.testServiceService.update(+id, updateTestServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testServiceService.remove(+id);
  }
}
