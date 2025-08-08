import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStockLocationDto } from './dto/create-stock_location.dto';
import { UpdateStockLocationDto } from './dto/update-stock_location.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StockLocationsService {
  constructor(private prisma: PrismaService) { }

  async create(createStockLocationDto: CreateStockLocationDto) {
    return this.prisma.stock_locations.create({
      data: createStockLocationDto
    });
  }

  async findAll() {
    const stockLocations = await this.prisma.stock_locations.findMany({
      orderBy: { id: 'desc' },
    });
    return { data: stockLocations };
  }

  async findAllStockLocationPagination({
    page = 1,
    pageSize = 10,
    keyword = '',
  }: {
    page?: number;
    pageSize?: number;
    keyword?: string;

  }) {
    const skip = (page - 1) * pageSize;

    const where: any = {};

    if (keyword) {
      where.OR = [
        { description: { contains: keyword } },
        { site_short_code: { contains: keyword } },
        { department: { name_th: { contains: keyword } } },
        { department: { name_en: { contains: keyword } } },
        { sale_office: { name_th: { contains: keyword } } },
        { sale_office: { name_en: { contains: keyword } } },
      ]
    }

    const total = await this.prisma.stock_locations.count({
      where,
    });

    const data = await this.prisma.stock_locations.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: { id: 'desc' },
      include: {
        department: {
          select: {
            department_code: true,
            name_th: true,
            name_en: true,
          },
        },
        sale_office: {
          select: {
            name_th: true,
            name_en: true,
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
    const stockLocation = await this.prisma.stock_locations.findUnique({
      where: { id },
    });

    if (!stockLocation) {
      throw new NotFoundException(`Stock location with ID ${id} not found`);
    }

    return stockLocation;
  }

  async update(id: number, updateStockLocationDto: UpdateStockLocationDto) {
    // Check if stock location exists
    await this.findOne(id);

    return this.prisma.stock_locations.update({
      where: { id },
      data: updateStockLocationDto,
    });
  }

  async remove(id: number) {
    // Check if stock location exists
    await this.findOne(id);

    return this.prisma.stock_locations.delete({
      where: { id },
    });
  }
}
