import { Injectable } from '@nestjs/common';
import { CreateItemCategoryPriceDto } from './dto/create-item_category_price.dto';
import { UpdateItemCategoryPriceDto } from './dto/update-item_category_price.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ItemCategoryPricesService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createItemCategoryPriceDto: CreateItemCategoryPriceDto) {
    return this.prisma.item_category_prices.create({
      data: createItemCategoryPriceDto,
      include: {
        item_category: true,
      },
    });
  }

  async findAll() {
    const itemCategoryPrices = await this.prisma.item_category_prices.findMany({
      include: {
        item_category: true,
      },
      orderBy: { id: 'asc' },
    });
    return { data: itemCategoryPrices };
  }

  async findAllItemCategoryPricesPagination(
    {
      page = 1,
      pageSize = 10,
      item_category_id = '',
      search = ''
    }:
      {
        page?: number;
        pageSize?: number;
        item_category_id?: string;
        search?: string;
      }
  ) {
    const skip = (page - 1) * pageSize;

    const where: any = {};

    if (item_category_id) {
      where.item_category_id = parseInt(item_category_id);
    }

    if (search) {
      where.description = { contains: search };
    }

    const total = await this.prisma.item_category_prices.count({
      where,
    });

    const data = await this.prisma.item_category_prices.findMany({
      where,
      skip,
      take: pageSize,
      include: {
        item_category: true,
      },
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
    const itemCategoryPrice = await this.prisma.item_category_prices.findUnique({
      where: { id },
      include: {
        item_category: true,
      },
    });
    return itemCategoryPrice;
  }

  async update(id: number, updateItemCategoryPriceDto: UpdateItemCategoryPriceDto) {
    const itemCategoryPrice = await this.prisma.item_category_prices.update({
      where: { id },
      data: updateItemCategoryPriceDto,
      include: {
        item_category: true,
      },
    });
    return itemCategoryPrice;
  }

  async remove(id: number) {
    const itemCategoryPrice = await this.prisma.item_category_prices.delete({
      where: { id },
    });
    return itemCategoryPrice;
  }
}
