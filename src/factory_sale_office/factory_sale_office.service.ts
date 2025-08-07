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

  async findAllItemPagination({ page = 1, pageSize = 10, keyword = '' }: { page?: number; pageSize?: number; keyword?: string }) {
    const skip = (page - 1) * pageSize;

    const where: any = {};

    if (keyword) {
      where.OR = [
        { sale_office_id: { contains: keyword } },
        { factory_id: { contains: keyword } },
      ];
    }

    const total = await this.prisma.factory_sale_office.count({
      where,
    });

    const data = await this.prisma.factory_sale_office.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: { id: 'asc' },
      select: {
        id: true,
        sale_office_id: true,
        factory_id: true,
        status: true,
        sale_office: {
          select: {
            name_th: true,
            name_en: true,
            site_path: true,
            lab_site_code: true,
          },
        },
        factory: {
          select: {
            name_th: true,
            name_en: true,
          },
        },
      },
    });

    return {
      data,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
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
