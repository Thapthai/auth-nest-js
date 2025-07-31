import { Injectable } from '@nestjs/common';
import { CreateRoundTimeCleanDto } from './dto/create-round_time_clean.dto';
import { UpdateRoundTimeCleanDto } from './dto/update-round_time_clean.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoundTimeCleanService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createRoundTimeCleanDto: CreateRoundTimeCleanDto) {
    return this.prisma.round_time_clean.create({
      data: createRoundTimeCleanDto,
    });
  }

  async findAll() {
    const roundTimeClean = await this.prisma.round_time_clean.findMany();
    return roundTimeClean;
  }

  async findAllRoundTimeCleanPagination(
    {
      page = 1,
      pageSize = 10,
      saleoffice_id = ''
    }:
      {
        page?: number;
        pageSize?: number;
        saleoffice_id?: string
      }
  ) {
    const skip = (page - 1) * pageSize;

    const where: any = {};

    if (saleoffice_id) {
      where.sale_office_id = parseInt(saleoffice_id);
    }

    const total = await this.prisma.round_time_clean.count({
      where,
    });

    const data = await this.prisma.round_time_clean.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: { id: 'asc' },
      select: {
        id: true,
        time: true,
        sale_office_id: true,
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

  async findOne(id: number) {
    const roundTimeClean = await this.prisma.round_time_clean.findUnique({
      where: { id },
    });
    return roundTimeClean;
  }

  async update(id: number, updateRoundTimeCleanDto: UpdateRoundTimeCleanDto) {
    const roundTimeClean = await this.prisma.round_time_clean.update({
      where: { id },
      data: updateRoundTimeCleanDto,
    });
    return roundTimeClean;
  }

  async remove(id: number) {
    const roundTimeClean = await this.prisma.round_time_clean.delete({
      where: { id },
    });
    return roundTimeClean;
  }
}
