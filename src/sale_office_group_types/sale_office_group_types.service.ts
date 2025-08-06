import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSaleOfficeGroupTypeDto } from './dto/create-sale_office_group_type.dto';
import { UpdateSaleOfficeGroupTypeDto } from './dto/update-sale_office_group_type.dto';

@Injectable()
export class SaleOfficeGroupTypesService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateSaleOfficeGroupTypeDto) {
    return this.prisma.sale_office_group_types.create({ data });
  }

  async findAllWithPagination({ page = 1, pageSize = 10, keyword = '' }: { page?: number; pageSize?: number; keyword?: string }) {
    const skip = (page - 1) * pageSize;

    const where: any = {};
    if (keyword) {
      where.OR = [
        { level: { contains: keyword } },
        { group: { contains: keyword } },
        { type: { contains: keyword } }
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.sale_office_group_types.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { create_at: 'desc' }
      }),
      this.prisma.sale_office_group_types.count({ where })
    ]);

    return {
      data,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize)
    };
  }

  findAll() {
    return this.prisma.sale_office_group_types.findMany({
      orderBy: { create_at: 'desc' }
    });
  }

  findOne(id: number) {
    return this.prisma.sale_office_group_types.findUnique({
      where: { id }
    });
  }

  update(id: number, data: UpdateSaleOfficeGroupTypeDto) {
    return this.prisma.sale_office_group_types.update({
      where: { id },
      data
    });
  }

  remove(id: number) {
    return this.prisma.sale_office_group_types.delete({
      where: { id }
    });
  }
}
