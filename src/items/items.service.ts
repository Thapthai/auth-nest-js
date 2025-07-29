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

    return this.prisma.items.findMany({
      where,
      orderBy: { id: 'desc' },
    });
  }

  async findAllItemPagination({ page = 1, pageSize = 10, keyword = '' }: { page?: number; pageSize?: number; keyword?: string }) {
    const skip = (page - 1) * pageSize;


    const where: any = {};

    if (keyword) {
      where.OR = [
        { name_th: { contains: keyword } },
        { name_en: { contains: keyword } },
      ];
    }

    const total = await this.prisma.items.count({
      where,
    });

    const data = await this.prisma.items.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: { id: 'asc' },
      select: {
        id: true,
        name_th: true,
        name_en: true,
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


  async findOne(id: number) {
    const item = await this.prisma.items.findUnique({
      where: { id },
    });
    if (!item) throw new NotFoundException(`Item with id ${id} not found`);
    return item;
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    await this.findOne(id); // เช็คว่ามี id นี้หรือไม่ก่อนอัพเดต
    return this.prisma.items.update({
      where: { id },
      data: updateItemDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // เช็คว่ามี id นี้หรือไม่ก่อนลบ
    return this.prisma.items.delete({
      where: { id },
    });
  }
}
