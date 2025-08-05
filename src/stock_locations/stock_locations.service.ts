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
    department_id = '',
    sale_office_id = ''
  }: {
    page?: number;
    pageSize?: number;
    keyword?: string;
    department_id?: string;
    sale_office_id?: string;
  }) {
    const skip = (page - 1) * pageSize;

    const where: any = {};

    if (keyword) {
      where.OR = [
        { description: { contains: keyword } },
        { site_short_code: { equals: isNaN(parseInt(keyword)) ? undefined : parseInt(keyword) } },
      ].filter(condition => condition.site_short_code !== undefined || condition.description);
    }

    if (department_id) {
      where.department_id = parseInt(department_id);
    }

    if (sale_office_id) {
      where.sale_office_id = parseInt(sale_office_id);
    }

    const total = await this.prisma.stock_locations.count({
      where,
    });

    const data = await this.prisma.stock_locations.findMany({
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
