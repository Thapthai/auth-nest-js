import { Injectable } from '@nestjs/common';
import { CreateShipToDto } from './dto/create-ship_to.dto';
import { UpdateShipToDto } from './dto/update-ship_to.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ShipTosService {
  constructor(private prisma: PrismaService) {}

  async create(createShipToDto: CreateShipToDto) {
    return this.prisma.ship_tos.create({
      data: createShipToDto,
    });
  }

  async findAll() {
    return this.prisma.ship_tos.findMany({
      orderBy: { id: 'desc' },
      include: {
        sale_office_customer: {
          include: {
            customer: true,
            sale_office: true,
          },
        },
      },
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
        { ship_to_code: { contains: keyword } },
        { description: { contains: keyword } },
        {
          sale_office_customer: {
            customer: {
              OR: [
                { name_th: { contains: keyword } },
                { name_en: { contains: keyword } },
                { site_short_code: { contains: keyword } },
              ],
            },
          },
        },
      ];
    }

    const total = await this.prisma.ship_tos.count({
      where,
    });

    const data = await this.prisma.ship_tos.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: { id: 'desc' },
      include: {
        sale_office_customer: {
          include: {
            customer: true,
            sale_office: true,
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

  async findOne(id: number) {
    return this.prisma.ship_tos.findUnique({
      where: { id },
      include: {
        sale_office_customer: {
          include: {
            customer: true,
            sale_office: true,
          },
        },
      },
    });
  }

  async update(id: number, updateShipToDto: UpdateShipToDto) {
    return this.prisma.ship_tos.update({
      where: { id },
      data: updateShipToDto,
    });
  }

  async remove(id: number) {
    return this.prisma.ship_tos.delete({
      where: { id },
    });
  }
}
