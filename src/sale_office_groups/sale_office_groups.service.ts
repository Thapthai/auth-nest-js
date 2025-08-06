import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSaleOfficeGroupDto } from './dto/create-sale_office_group.dto';
import { UpdateSaleOfficeGroupDto } from './dto/update-sale_office_group.dto';

@Injectable()
export class SaleOfficeGroupsService {
  constructor(private prisma: PrismaService) { }

  create(data: CreateSaleOfficeGroupDto) {
    return this.prisma.sale_office_groups.create({ data });
  }

  async findAllWithPagination({ page = 1, pageSize = 10, keyword = '' }: { page?: number; pageSize?: number; keyword?: string }) {
    const skip = (page - 1) * pageSize;

    const where: any = {};
    if (keyword) {
      const numericKeyword = parseInt(keyword);
      where.OR = [
        { name_th: { contains: keyword } },
        { name_en: { contains: keyword } },
        { description: { contains: keyword } },
        { code: { contains: keyword } },
        // If keyword is numeric, also search by IDs
        ...((!isNaN(numericKeyword)) ? [
          { sale_office_id: numericKeyword },
          { sale_office_group_type_id: numericKeyword }
        ] : [])
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.sale_office_groups.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { create_at: 'desc' }
      }),
      this.prisma.sale_office_groups.count({ where })
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
    return this.prisma.sale_office_groups.findMany({
      orderBy: { create_at: 'desc' }
    });
  }

  findOne(id: number) {
    return this.prisma.sale_office_groups.findUnique({
      where: { id }
    });
  }

  update(id: number, data: UpdateSaleOfficeGroupDto) {
    return this.prisma.sale_office_groups.update({
      where: { id },
      data
    });
  }

  remove(id: number) {
    return this.prisma.sale_office_groups.delete({
      where: { id }
    });
  }
}
