import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) { }

  async create(createItemDto: CreateItemDto) {
    return this.prisma.items.create({
      data: createItemDto,
      include: {
        material: true,
        item_category: true,
      },
    });
  }

  async findAll(department_id?: number, with_out_id?: number[]) {
    const where: any = {};

    if (department_id) {
      where.department_id = department_id;
    }

    if (with_out_id && with_out_id.length > 0) {
      where.id = { notIn: with_out_id };
    }

    const items = await this.prisma.items.findMany({
      where,
      include: {
        material: true,
        item_category: true,
      },
      orderBy: { id: 'desc' },
    });
    return { data: items };
  }

  async findAllItemPagination({
    page = 1,
    pageSize = 10,
    keyword = '',
    department_id = '',
    saleoffice_id = '',
    item_category_id = '',
    material_id = ''
  }: {
    page?: number;
    pageSize?: number;
    keyword?: string;
    department_id?: string;
    saleoffice_id?: string;
    item_category_id?: string;
    material_id?: string;
  }) {
    const skip = (page - 1) * pageSize;

    const where: any = {};

    if (keyword) {
      where.OR = [
        { name_th: { contains: keyword } },
        { name_en: { contains: keyword } },
        { rfid_number: { contains: keyword } },
      ];
    }

    if (department_id) {
      where.department_id = parseInt(department_id);
    }

    if (saleoffice_id) {
      where.saleoffice_id = parseInt(saleoffice_id);
    }

    if (item_category_id) {
      where.item_category_id = parseInt(item_category_id);
    }

    if (material_id) {
      where.material_id = parseInt(material_id);
    }

    const total = await this.prisma.items.count({
      where,
    });

    const data = await this.prisma.items.findMany({
      where,
      skip,
      take: pageSize,
      include: {
        material: {
          include: {
            material_types: true,
          },
        },
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
    const item = await this.prisma.items.findUnique({
      where: { id },
      include: {
        material: {
          include: {
            material_types: true,
            sap_sale: true,
          },
        },
        item_category: {
          include: {
            item_category_prices: true,
          },
        },
      },
    });
    if (!item) throw new NotFoundException(`Item with id ${id} not found`);
    return item;
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    await this.findOne(id); // เช็คว่ามี id นี้หรือไม่ก่อนอัพเดต
    return this.prisma.items.update({
      where: { id },
      data: updateItemDto,
      include: {
        material: true,
        item_category: true,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id); // เช็คว่ามี id นี้หรือไม่ก่อนลบ
    return this.prisma.items.delete({
      where: { id },
    });
  }
}
