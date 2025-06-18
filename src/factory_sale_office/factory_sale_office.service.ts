import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFactorySaleOfficeDto } from './dto/create-factory_sale_office.dto';
import { UpdateFactorySaleOfficeDto } from './dto/update-factory_sale_office.dto';

@Injectable()
export class FactorySaleOfficeService {
  constructor(private prisma: PrismaService) { }

  create(data: CreateFactorySaleOfficeDto) {
    return this.prisma.factory_sale_office.create({ data });
  }

  findAll() {
    return this.prisma.factory_sale_office.findMany({
      // include: {
      //   // คุณสามารถ include relation ได้ เช่น factory หรือ sale_office ถ้ามี
      // },
    });
  }

  findOne(id: number) {
    return this.prisma.factory_sale_office.findUnique({
      where: { id },
    });
  }

  update(id: number, dto: UpdateFactorySaleOfficeDto) {
    return this.prisma.factory_sale_office.update({
      where: { id },
      data: dto, 
    });
  } 

  remove(id: number) {
    return this.prisma.factory_sale_office.delete({
      where: { id },
    });
  }
}
