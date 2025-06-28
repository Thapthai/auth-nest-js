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


  findAllWithPagination({ page = 1, pageSize = 10, keyword = '' }: { page?: number; pageSize?: number; keyword?: string }) {
    const skip = (page - 1) * pageSize;

    return this.prisma.sale_offices.findMany({
      where: {
        OR: [
          { site_code: { contains: keyword } },
          { site_office_name_th: { contains: keyword } },
          { site_office_name_en: { contains: keyword } },
        ],
      },
      skip,
      take: pageSize,
      orderBy: { id: 'asc' },
      select: {
        id: true,
        site_code: true,
        site_office_name_th: true,
        site_office_name_en: true,
        status: true,
        create_at: true,
        update_at: true,
      },
    });
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
