import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateStockLocationDto } from './dto/create-stock_location.dto';
import { UpdateStockLocationDto } from './dto/update-stock_location.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StockLocationsService {
  constructor(private prisma: PrismaService) { }

  // Function to get detailed duplicate information
  async getDuplicateFieldDetails(site_short_code: string, sale_office_id: number, excludeId?: number): Promise<string[]> {
    const duplicateFields: string[] = [];

    // Check if site_short_code already exists in the same sale_office
    const existingSiteShortCode = await this.prisma.stock_locations.findFirst({
      where: {
        site_short_code,
        sale_office_id,
        ...(excludeId && { NOT: { id: excludeId } })
      }
    });
    if (existingSiteShortCode) {
      duplicateFields.push('Site short code already exists in this sale office');
    }

    return duplicateFields;
  }



  async create(data: CreateStockLocationDto) {
    // Check for duplicates
    const duplicateFields = await this.getDuplicateFieldDetails(
      data.site_short_code,
      data.sale_office_id
    );

    if (duplicateFields.length > 0) {
      throw new ConflictException(duplicateFields);
    }

    return this.prisma.stock_locations.create({ data });
  }


  async findAll() {
    const stockLocations = await this.prisma.stock_locations.findMany({
      orderBy: { id: 'desc' },
      include: {
        sale_office: {
          select: {
            name_th: true,
            name_en: true,
          },
        },
      },
    });
    return { data: stockLocations };
  }

  async findAllStockLocationPagination({
    page = 1,
    pageSize = 10,
    keyword = '',
    sale_office_id = ''
  }: {
    page?: number;
    pageSize?: number;
    keyword?: string;
    sale_office_id?: string;
  }) {
    const skip = (page - 1) * pageSize;

    const where: any = {};

    // Filter by sale_office_id if provided
    if (sale_office_id) {
      where.sale_office_id = parseInt(sale_office_id);
    }

    // Search by keyword
    if (keyword) {
      where.OR = [
        { description: { contains: keyword } },
        { site_short_code: { contains: keyword } },
        { sale_office: { name_th: { contains: keyword } } },
        { sale_office: { name_en: { contains: keyword } } },
        { sale_office: { sale_office_code: { contains: keyword } } },
      ];
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
        sale_office: {
          select: {
            name_th: true,
            name_en: true,
            sale_office_code: true,
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
      include: {
        sale_office: {
          select: {
            name_th: true,
            name_en: true,
            sale_office_code: true,
          },
        },
      },
    });

    if (!stockLocation) {
      throw new NotFoundException(`Stock location with ID ${id} not found`);
    }

    return stockLocation;
  }

  async update(id: number, updateStockLocationDto: UpdateStockLocationDto) {
    // Check if stock location exists
    const existingStockLocation = await this.findOne(id);

    // Check for duplicates if site_short_code or sale_office_id is being updated
    if (updateStockLocationDto.site_short_code || updateStockLocationDto.sale_office_id) {
      const duplicateFields = await this.getDuplicateFieldDetails(
        updateStockLocationDto.site_short_code || existingStockLocation.site_short_code,
        updateStockLocationDto.sale_office_id || existingStockLocation.sale_office_id,
        id
      );

      if (duplicateFields.length > 0) {
        throw new ConflictException(duplicateFields);
      }
    }

    return this.prisma.stock_locations.update({
      where: { id },
      data: updateStockLocationDto,
      include: {
        sale_office: {
          select: {
            name_th: true,
            name_en: true,
            sale_office_code: true,
          },
        },
      },
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
