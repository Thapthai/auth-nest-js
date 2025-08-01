import { Injectable } from '@nestjs/common';
import { CreateItemCategoryDto } from './dto/create-item_category.dto';
import { UpdateItemCategoryDto } from './dto/update-item_category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ItemCategoriesService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createItemCategoryDto: CreateItemCategoryDto) {
    return this.prisma.item_categories.create({
      data: createItemCategoryDto,
    });
  }

  async findAll() {
    const itemCategories = await this.prisma.item_categories.findMany({
      orderBy: { id: 'asc' },
    });
    return { data: itemCategories };
  }

  async findAllItemCategoriesPagination(
    {
      page = 1,
      pageSize = 10,
      sale_office_id = '',
      department_id = '',
      search = ''
    }:
      {
        page?: number;
        pageSize?: number;
        sale_office_id?: string;
        department_id?: string;
        search?: string;
      }
  ) {
    const skip = (page - 1) * pageSize;

    const where: any = {};

    if (sale_office_id) {
      where.sale_office_id = parseInt(sale_office_id);
    }

    if (department_id) {
      where.department_id = parseInt(department_id);
    }

    if (search) {
      where.description = { contains: search };
    }

    const total = await this.prisma.item_categories.count({
      where,
    });

    const data = await this.prisma.item_categories.findMany({
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
    const itemCategory = await this.prisma.item_categories.findUnique({
      where: { id },
      include: {
        items: true,
        item_category_prices: true,
      },
    });
    return itemCategory;
  }

  async update(id: number, updateItemCategoryDto: UpdateItemCategoryDto) {
    const itemCategory = await this.prisma.item_categories.update({
      where: { id },
      data: updateItemCategoryDto,
    });
    return itemCategory;
  }

  async remove(id: number) {
    const itemCategory = await this.prisma.item_categories.delete({
      where: { id },
    });
    return itemCategory;
  }
}
