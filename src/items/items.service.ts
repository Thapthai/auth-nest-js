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

  async findAll(department_id?: number) {
    const where = department_id ? { department_id } : {};

    const items = await this.prisma.items.findMany({
      where,
      orderBy: { id: 'desc' },
    });

    return items;
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
