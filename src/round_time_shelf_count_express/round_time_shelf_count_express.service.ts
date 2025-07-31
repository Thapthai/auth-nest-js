import { Injectable } from '@nestjs/common';
import { CreateRoundTimeShelfCountExpressDto } from './dto/create-round_time_shelf_count_express.dto';
import { UpdateRoundTimeShelfCountExpressDto } from './dto/update-round_time_shelf_count_express.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoundTimeShelfCountExpressService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createRoundTimeShelfCountExpressDto: CreateRoundTimeShelfCountExpressDto) {
    return this.prisma.round_time_shelf_count_express.create({
      data: createRoundTimeShelfCountExpressDto,
    });
  }

  async findAll() {
    const roundTimeShelfCountExpress = await this.prisma.round_time_shelf_count_express.findMany();
    return roundTimeShelfCountExpress;
  }

  async findAllRoundTimeShelfCountExpressPagination(
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

    const total = await this.prisma.round_time_shelf_count_express.count({
      where,
    });

    const data = await this.prisma.round_time_shelf_count_express.findMany({
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
    const roundTimeShelfCountExpress = await this.prisma.round_time_shelf_count_express.findUnique({
      where: { id },
    });
    return roundTimeShelfCountExpress;
  }

  async update(id: number, updateRoundTimeShelfCountExpressDto: UpdateRoundTimeShelfCountExpressDto) {
    const roundTimeShelfCountExpress = await this.prisma.round_time_shelf_count_express.update({
      where: { id },
      data: updateRoundTimeShelfCountExpressDto,
    });
    return roundTimeShelfCountExpress;
  }

  async remove(id: number) {
    const roundTimeShelfCountExpress = await this.prisma.round_time_shelf_count_express.delete({
      where: { id },
    });
    return roundTimeShelfCountExpress;
  }
}
