import { Injectable } from '@nestjs/common';
import { CreateRoundTimeFactoryDto } from './dto/create-round_time_factory.dto';
import { UpdateRoundTimeFactoryDto } from './dto/update-round_time_factory.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoundTimeFactoryService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createRoundTimeFactoryDto: CreateRoundTimeFactoryDto) {
    return this.prisma.round_time_factory.create({
      data: createRoundTimeFactoryDto,
    });
  }

  async findAll() {
    const roundTimeFactory = await this.prisma.round_time_factory.findMany();
    return roundTimeFactory;
  }

  async findAllRoundTimeFactoryPagination(
    {
      page = 1,
      pageSize = 10,
      factory_id = ''
    }:
      {
        page?: number;
        pageSize?: number;
        factory_id?: string
      }
  ) {
    const skip = (page - 1) * pageSize;

    const where: any = {};

    if (factory_id) {
      where.factory_id = parseInt(factory_id);
    }

    const total = await this.prisma.round_time_factory.count({
      where,
    });

    const data = await this.prisma.round_time_factory.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: { id: 'asc' },
      select: {
        id: true,
        time: true,
        factory_id: true,
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
    const roundTimeFactory = await this.prisma.round_time_factory.findUnique({
      where: { id },
    });
    return roundTimeFactory;
  }

  async update(id: number, updateRoundTimeFactoryDto: UpdateRoundTimeFactoryDto) {
    const roundTimeFactory = await this.prisma.round_time_factory.update({
      where: { id },
      data: updateRoundTimeFactoryDto,
    });
    return roundTimeFactory;
  }

  async remove(id: number) {
    const roundTimeFactory = await this.prisma.round_time_factory.delete({
      where: { id },
    });
    return roundTimeFactory;
  }
}
