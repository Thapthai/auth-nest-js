import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentTypeDto } from './dto/create-payment_type.dto';
import { UpdatePaymentTypeDto } from './dto/update-payment_type.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PaymentTypesService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createPaymentTypeDto: CreatePaymentTypeDto) {
    return this.prisma.payment_types.create({
      data: createPaymentTypeDto,
    });
  }

  async findAll() {
    return this.prisma.payment_types.findMany({
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
      ];
    }

    const total = await this.prisma.payment_types.count({
      where,
    });

    const data = await this.prisma.payment_types.findMany({
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
    const paymentType = await this.prisma.payment_types.findUnique({
      where: { id },
    });
    if (!paymentType) {
      throw new NotFoundException(`Payment Type #${id} not found`);
    }
    return paymentType;
  }

  async update(id: number, updatePaymentTypeDto: UpdatePaymentTypeDto) {
    await this.findOne(id);
    return this.prisma.payment_types.update({
      where: { id },
      data: updatePaymentTypeDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.payment_types.delete({
      where: { id },
    });
  }
}