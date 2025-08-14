import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerGroupDto } from './dto/create-customer_group.dto';
import { UpdateCustomerGroupDto } from './dto/update-customer_group.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CustomerGroupsService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createCustomerGroupDto: CreateCustomerGroupDto) {
    return this.prisma.customer_groups.create({
      data: createCustomerGroupDto,
    });
  }

  async findAll() {
    return this.prisma.customer_groups.findMany({
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
        { level1: { contains: keyword } },
        { level2: { contains: keyword } },
      ];
    }

    const total = await this.prisma.customer_groups.count({
      where,
    });

    const data = await this.prisma.customer_groups.findMany({
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
    const customerGroup = await this.prisma.customer_groups.findUnique({
      where: { id },
    });
    if (!customerGroup) {
      throw new NotFoundException(`Customer Group #${id} not found`);
    }
    return customerGroup;
  }

  async update(id: number, updateCustomerGroupDto: UpdateCustomerGroupDto) {
    await this.findOne(id);
    return this.prisma.customer_groups.update({
      where: { id },
      data: updateCustomerGroupDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.customer_groups.delete({
      where: { id },
    });
  }
}
