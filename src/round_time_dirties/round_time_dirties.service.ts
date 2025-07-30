import { Injectable } from '@nestjs/common';
import { CreateRoundTimeDirtyDto } from './dto/create-round_time_dirty.dto';
import { UpdateRoundTimeDirtyDto } from './dto/update-round_time_dirty.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoundTimeDirtiesService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createRoundTimeDirtyDto: CreateRoundTimeDirtyDto) {
    return this.prisma.round_time_dirties.create({
      data: createRoundTimeDirtyDto,
    });
  }

  async findAll() {
    const roundTimeDirties = await this.prisma.round_time_dirties.findMany();
    return roundTimeDirties;
  }


  async findAllRoundTimeDirtiesPagination(
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

    const total = await this.prisma.round_time_dirties.count({
      where,
    });

    const data = await this.prisma.round_time_dirties.findMany({
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
    const roundTimeDirty = await this.prisma.round_time_dirties.findUnique({
      where: { id },
    });
    return roundTimeDirty;
  }

  async update(id: number, updateRoundTimeDirtyDto: UpdateRoundTimeDirtyDto) {
    const roundTimeDirty = await this.prisma.round_time_dirties.update({
      where: { id },
      data: updateRoundTimeDirtyDto,
    });
    return roundTimeDirty;
  }

  async remove(id: number) {
    const roundTimeDirty = await this.prisma.round_time_dirties.delete({
      where: { id },
    });
    return roundTimeDirty;
  }
}
