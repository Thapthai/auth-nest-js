import { Injectable } from '@nestjs/common';
import { CreateSaleOfficeCustomerDto } from './dto/create-sale_office_customer.dto';
import { UpdateSaleOfficeCustomerDto } from './dto/update-sale_office_customer.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SaleOfficeCustomersService {
  constructor(private prisma: PrismaService) {}

  async create(createSaleOfficeCustomerDto: CreateSaleOfficeCustomerDto) {
    return this.prisma.sale_office_customers.create({
      data: createSaleOfficeCustomerDto,
      include: {
        sale_office: true,
        customer: true,
      },
    });
  }

  async findAll() {
    return this.prisma.sale_office_customers.findMany({
      orderBy: { id: 'desc' },
      include: {
        sale_office: true,
        customer: true,
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
        {
          customer: {
            OR: [
              { name_th: { contains: keyword } },
              { name_en: { contains: keyword } },
              { site_short_code: { contains: keyword } },
              { email: { contains: keyword } },
            ],
          },
        },
        {
          sale_office: {
            OR: [
              { name_th: { contains: keyword } },
              { sale_office_code: { contains: keyword } },
            ],
          },
        },
      ];
    }

    const total = await this.prisma.sale_office_customers.count({
      where,
    });

    const data = await this.prisma.sale_office_customers.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: { id: 'desc' },
      include: {
        sale_office: true,
        customer: true,
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
    return this.prisma.sale_office_customers.findUnique({
      where: { id },
      include: {
        sale_office: true,
        customer: true,
      },
    });
  }

  async update(id: number, updateSaleOfficeCustomerDto: UpdateSaleOfficeCustomerDto) {
    return this.prisma.sale_office_customers.update({
      where: { id },
      data: updateSaleOfficeCustomerDto,
      include: {
        sale_office: true,
        customer: true,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.sale_office_customers.delete({
      where: { id },
    });
  }
}
