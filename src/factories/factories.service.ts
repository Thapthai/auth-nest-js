import { Injectable } from '@nestjs/common';
import { CreateFactoryDto } from './dto/create-factory.dto';
import { UpdateFactoryDto } from './dto/update-factory.dto';
import { PrismaService } from 'src/prisma/prisma.service';

export interface FindAllFactoriesQuery {
  page?: number;
  limit?: number;
  search?: string;
}

export interface PaginatedFactoriesResult {
  data: any[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

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

  async findAllItemPagination({ page = 1, pageSize = 10, keyword = '' }: { page?: number; pageSize?: number; keyword?: string }) {
    const skip = (page - 1) * pageSize;

    const where: any = {};

    if (keyword) {
      where.OR = [
        { name_th: { contains: keyword } },
        { name_en: { contains: keyword } },
        { address: { contains: keyword } },
      ];
    }

    const total = await this.prisma.factories.count({
      where,
    });

    const data = await this.prisma.factories.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: { id: 'asc' },
      select: {
        id: true,
        name_th: true,
        name_en: true,
        address: true,
        status: true,
        create_at: true,
        update_at: true,
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
