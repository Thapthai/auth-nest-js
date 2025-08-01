import { Injectable } from '@nestjs/common';
import { CreateSapSaleDto } from './dto/create-sap_sale.dto';
import { UpdateSapSaleDto } from './dto/update-sap_sale.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SapSaleService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createSapSaleDto: CreateSapSaleDto) {
    return this.prisma.sap_sale.create({
      data: createSapSaleDto,
    });
  }

  async findAll() {
    const sapSale = await this.prisma.sap_sale.findMany({
      orderBy: { id: 'asc' },
    });
    return { data: sapSale };
  }

  async findAllSapSalePagination(
    {
      page = 1,
      pageSize = 10,
      search = ''
    }:
      {
        page?: number;
        pageSize?: number;
        search?: string;
      }
  ) {
    const skip = (page - 1) * pageSize;

    const where: any = {};

    if (search) {
      where.OR = [
        { code: { contains: search } },
        { description: { contains: search } },
      ];
    }

    const total = await this.prisma.sap_sale.count({
      where,
    });

    const data = await this.prisma.sap_sale.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: { id: 'asc' },
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
    const sapSale = await this.prisma.sap_sale.findUnique({
      where: { id },
      include: {
        materials: true,
      },
    });
    return sapSale;
  }

  async update(id: number, updateSapSaleDto: UpdateSapSaleDto) {
    const sapSale = await this.prisma.sap_sale.update({
      where: { id },
      data: updateSapSaleDto,
    });
    return sapSale;
  }

  async remove(id: number) {
    const sapSale = await this.prisma.sap_sale.delete({
      where: { id },
    });
    return sapSale;
  }
}
