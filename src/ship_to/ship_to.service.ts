import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShipToDto } from './dto/create-ship_to.dto';
import { UpdateShipToDto } from './dto/update-ship_to.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ShipToService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createShipToDto: CreateShipToDto) {
    return this.prisma.ship_to.create({
      data: createShipToDto,
    });
  }

  async findAll() {
    return this.prisma.ship_to.findMany({
      orderBy: { id: 'desc' },
    });
  }

  async findAllWithPagination({
    page = 1,
    pageSize = 10,
    keyword = ''
  }: {
    page?: number;
    pageSize?: number;
    keyword?: string;
  }) {
    const skip = (page - 1) * pageSize;

    const where: any = {};

    // Search by keyword
    if (keyword) {
      where.OR = [
        { name_th: { contains: keyword } },
        { name_en: { contains: keyword } },
        { site_short_code: { contains: keyword } },
      ];
    }

    const total = await this.prisma.ship_to.count({
      where,
    });

    const data = await this.prisma.ship_to.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: { id: 'desc' },
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
    const shipTo = await this.prisma.ship_to.findUnique({
      where: { id },
    });
    if (!shipTo) {
      throw new NotFoundException(`Ship To #${id} not found`);
    }
    return shipTo;
  }

  async update(id: number, updateShipToDto: UpdateShipToDto) {
    await this.findOne(id);
    return this.prisma.ship_to.update({
      where: { id },
      data: updateShipToDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.ship_to.delete({
      where: { id },
    });
  }
}
