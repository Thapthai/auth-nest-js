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

  async findAllWithPagination(query: FindAllFactoriesQuery): Promise<PaginatedFactoriesResult> {
    const { page = 1, limit = 10, search } = query;
    const skip = (page - 1) * limit;

    // Build where clause for search
    const where = search
      ? {
          OR: [
            { name_th: { contains: search, mode: 'insensitive' } },
            { name_en: { contains: search, mode: 'insensitive' } },
            { address: { contains: search, mode: 'insensitive' } },
          ],
        }
      : {};

    // Get total count
    const total = await this.prisma.factories.count({ where });

    // Get paginated data
    const data = await this.prisma.factories.findMany({
      where,
      skip,
      take: limit,
      orderBy: { id: 'desc' },
    });

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
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
