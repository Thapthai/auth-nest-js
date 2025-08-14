import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createCustomerDto: CreateCustomerDto) {
    return this.prisma.customers.create({
      data: createCustomerDto,
    });
  }

  async findAll() {
    return this.prisma.customers.findMany({
      orderBy: { id: 'desc' },
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
        { name_th: { contains: keyword } },
        { name_en: { contains: keyword } },
        { site_short_code: { contains: keyword } },
        { address: { contains: keyword } },
        { tel: { contains: keyword } },
        { email: { contains: keyword } },
        { tax_no: { contains: keyword } },
        { tax_id: { contains: keyword } },
      ];
    }

    const total = await this.prisma.customers.count({
      where,
    });

    const data = await this.prisma.customers.findMany({
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
    const customer = await this.prisma.customers.findUnique({
      where: { id },
    });
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    await this.findOne(id);
    return this.prisma.customers.update({
      where: { id },
      data: updateCustomerDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.customers.delete({
      where: { id },
    });
  }
}
