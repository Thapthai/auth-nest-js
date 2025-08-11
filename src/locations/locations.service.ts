import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LocationsService {
  constructor(private prisma: PrismaService) { }

  // Function to get detailed duplicate information
  async getDuplicateFieldDetails(site_short_code: string, stock_location_id: number, excludeId?: number): Promise<string[]> {
    const duplicateFields: string[] = [];

    // Check if site_short_code already exists in the same stock_location
    const existingSiteShortCode = await this.prisma.locations.findFirst({
      where: {
        site_short_code,
        stock_location_id,
        ...(excludeId && { NOT: { id: excludeId } })
      }
    });
    if (existingSiteShortCode) {
      duplicateFields.push('Site short code already exists in this stock location');
    }

    return duplicateFields;
  }

  async create(data: CreateLocationDto) {
    // Check for duplicates
    const duplicateFields = await this.getDuplicateFieldDetails(
      data.site_short_code,
      data.stock_location_id
    );

    if (duplicateFields.length > 0) {
      throw new ConflictException(duplicateFields);
    }

    return this.prisma.locations.create({ data });
  }

  async findAll() {
    const locations = await this.prisma.locations.findMany({
      orderBy: { id: 'desc' },
      include: {
        stock_location: {
          select: {
            site_short_code: true,
            description: true,
            sale_office: {
              select: {
                name_th: true,
                name_en: true,
                sale_office_code: true,
              },
            },
          },
        },
      },
    });
    return { data: locations };
  }

  async findAllLocationPagination({
    page = 1,
    pageSize = 10,
    keyword = '',
    stock_location_id = ''
  }: {
    page?: number;
    pageSize?: number;
    keyword?: string;
    stock_location_id?: string;
  }) {
    const skip = (page - 1) * pageSize;

    const where: any = {};

    // Filter by stock_location_id if provided
    if (stock_location_id) {
      where.stock_location_id = parseInt(stock_location_id);
    }

    // Search by keyword
    if (keyword) {
      where.OR = [
        { description: { contains: keyword } },
        { site_short_code: { contains: keyword } },
        { stock_location: { description: { contains: keyword } } },
        { stock_location: { site_short_code: { contains: keyword } } },
        { stock_location: { sale_office: { name_th: { contains: keyword } } } },
        { stock_location: { sale_office: { name_en: { contains: keyword } } } },
        { stock_location: { sale_office: { sale_office_code: { contains: keyword } } } },
      ];
    }

    const total = await this.prisma.locations.count({
      where,
    });

    const data = await this.prisma.locations.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: { id: 'desc' },
      include: {
        stock_location: {
          select: {
            site_short_code: true,
            description: true,
            sale_office: {
              select: {
                name_th: true,
                name_en: true,
                sale_office_code: true,
              },
            },
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
    const location = await this.prisma.locations.findUnique({
      where: { id },
      include: {
        stock_location: {
          select: {
            site_short_code: true,
            description: true,
            sale_office: {
              select: {
                name_th: true,
                name_en: true,
                sale_office_code: true,
              },
            },
          },
        },
      },
    });

    if (!location) {
      throw new NotFoundException(`Location with ID ${id} not found`);
    }

    return location;
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    // Check if location exists
    const existingLocation = await this.findOne(id);

    // Check for duplicates if site_short_code or stock_location_id is being updated
    if (updateLocationDto.site_short_code || updateLocationDto.stock_location_id) {
      const duplicateFields = await this.getDuplicateFieldDetails(
        updateLocationDto.site_short_code || existingLocation.site_short_code,
        updateLocationDto.stock_location_id || existingLocation.stock_location_id,
        id
      );

      if (duplicateFields.length > 0) {
        throw new ConflictException(duplicateFields);
      }
    }

    return this.prisma.locations.update({
      where: { id },
      data: updateLocationDto,
      include: {
        stock_location: {
          select: {
            site_short_code: true,
            description: true,
            sale_office: {
              select: {
                name_th: true,
                name_en: true,
                sale_office_code: true,
              },
            },
          },
        },
      },
    });
  }

  async remove(id: number) {
    // Check if location exists
    await this.findOne(id);

    return this.prisma.locations.delete({
      where: { id },
    });
  }
}
