import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSaleOfficeDto } from './dto/create-sale_office.dto';
import { UpdateSaleOfficeDto } from './dto/update-sale_office.dto';


@Injectable()
export class SaleOfficesService {
  constructor(private prisma: PrismaService) { }


  // Function to get detailed duplicate information
  async getDuplicateFieldDetails(sale_office_code: string, site_path: string, lab_site_code: string, excludeId?: number): Promise<string[]> {
    const duplicateFields: string[] = [];
    
    // Check sale_office_code
    const existingSaleOfficeCode = await this.prisma.sale_offices.findFirst({
      where: {
        sale_office_code,
        ...(excludeId && { NOT: { id: excludeId } })
      }
    });
    if (existingSaleOfficeCode) {
      duplicateFields.push('Sale office code already exists');
    }

    // Check site_path
    const existingSitePath = await this.prisma.sale_offices.findFirst({
      where: {
        site_path,
        ...(excludeId && { NOT: { id: excludeId } })
      }
    });
    if (existingSitePath) {
      duplicateFields.push('Site path already exists');
    }

    // Check lab_site_code
    const existingLabSiteCode = await this.prisma.sale_offices.findFirst({
      where: {
        lab_site_code,
        ...(excludeId && { NOT: { id: excludeId } })
      }
    });
    if (existingLabSiteCode) {
      duplicateFields.push('Lab site code already exists');
    }

    return duplicateFields;
  }

  async create(data: CreateSaleOfficeDto) {
    // Check for duplicates with detailed error messages
    const duplicateFields = await this.getDuplicateFieldDetails(
      data.sale_office_code,
      data.site_path,
      data.lab_site_code
    );

    if (duplicateFields.length > 0) {
      throw new ConflictException(duplicateFields);
    }

    return this.prisma.sale_offices.create({ data });
  }

  // findAll() {
  //   return this.prisma.sale_offices.findMany(
  //     {
  //       include: {
  //         departments: false
  //       }
  //     }
  //   );
  // }


  async findAllWithPagination({ page = 1, pageSize = 10, keyword = '' }: { page?: number; pageSize?: number; keyword?: string }) {
    const skip = (page - 1) * pageSize;


    const where: any = {};

    if (keyword) {
      where.OR = [
        { sale_office_code: { contains: keyword } },
        { name_th: { contains: keyword } },
        { name_en: { contains: keyword } },
      ];
    }

    const total = await this.prisma.sale_offices.count({
      where,
    });

    const data = await this.prisma.sale_offices.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: { id: 'asc' },
      select: {
        id: true,
        sale_office_code: true,
        name_th: true,
        name_en: true,
        site_path: true,
        lab_site_code: true,
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



  findOne(id: number) {
    return this.prisma.sale_offices.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateSaleOfficeDto) {
    // Check for duplicates when updating (exclude current record)
    if (data.sale_office_code || data.site_path || data.lab_site_code) {
      // Get current record to check against
      const currentRecord = await this.prisma.sale_offices.findUnique({
        where: { id },
        select: {
          sale_office_code: true,
          site_path: true,
          lab_site_code: true
        }
      });

      if (!currentRecord) {
        throw new ConflictException('Sale office not found');
      }

      const duplicateFields = await this.getDuplicateFieldDetails(
        data.sale_office_code || currentRecord.sale_office_code,
        data.site_path || currentRecord.site_path,
        data.lab_site_code || currentRecord.lab_site_code,
        id // Exclude current record
      );

      if (duplicateFields.length > 0) {
        throw new ConflictException(duplicateFields);
      }
    }

    return this.prisma.sale_offices.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.sale_offices.delete({ where: { id } });
  }
}
