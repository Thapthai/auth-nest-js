import { Injectable } from '@nestjs/common';
import { CreateFactoryDto } from './dto/create-factory.dto';
import { UpdateFactoryDto } from './dto/update-factory.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FactoriesService {
  constructor(private prisma: PrismaService) { }

  create(dto: CreateFactoryDto) {
    return this.prisma.factories.create({ data: dto });
  }

  findAll() {
    return this.prisma.factories.findMany({
      orderBy: { id: 'desc' },
    });
  }

  findOne(id: number) {
    return this.prisma.factories.findUnique({ where: { id } });
  }

  update(id: number, dto: UpdateFactoryDto) {
    return this.prisma.factories.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: number) {
    return this.prisma.factories.delete({ where: { id } });
  }
}
