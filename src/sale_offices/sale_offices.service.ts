import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSaleOfficeDto } from './dto/create-sale_office.dto';
import { UpdateSaleOfficeDto } from './dto/update-sale_office.dto';
 

@Injectable()
export class SaleOfficesService {
  constructor(private prisma: PrismaService) { }

  create(data: CreateSaleOfficeDto) {
    return this.prisma.sale_offices.create({ data });
  }

  findAll() {
    return this.prisma.sale_offices.findMany();
  }

  findOne(id: number) {
    return this.prisma.sale_offices.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateSaleOfficeDto) {
    return this.prisma.sale_offices.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.sale_offices.delete({ where: { id } });
  }
}
