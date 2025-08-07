import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSaleOfficeDto } from './dto/create-sale_office.dto';
import { UpdateSaleOfficeDto } from './dto/update-sale_office.dto';


@Injectable()
export class SaleOfficesService {
  constructor(private prisma: PrismaService) { }

  create(data: CreateSaleOfficeDto) {
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

  update(id: number, data: UpdateSaleOfficeDto) {
    return this.prisma.sale_offices.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.sale_offices.delete({ where: { id } });
  }
}
