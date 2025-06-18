import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDirtyDetailDto } from './dto/create-dirty_detail.dto';
import { UpdateDirtyDetailDto } from './dto/update-dirty_detail.dto';


@Injectable()
export class DirtyDetailsService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createDirtyDetailDto: CreateDirtyDetailDto) {
    return this.prisma.dirty_details.create({
      data: createDirtyDetailDto,
    });
  }

  async findAll(dirty_id?: number) {
    const where = dirty_id ? { dirty_id } : {};

    const details = await this.prisma.dirty_details.findMany({
      where,
      orderBy: { id: 'desc' },
      include: {
        unregistered_item: true, // 👈 Join ข้อมูลจาก table unregistered_items
      },
    });

    return details;
  }

  async findOne(id: number) {
    const detail = await this.prisma.dirty_details.findUnique({ where: { id } });
    if (!detail) throw new NotFoundException(`DirtyDetail #${id} not found`);
    return detail;
  }

  async update(id: number, updateDirtyDetailDto: UpdateDirtyDetailDto) {
    await this.findOne(id);
    return this.prisma.dirty_details.update({
      where: { id },
      data: updateDirtyDetailDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.dirty_details.delete({
      where: { id },
    });
  }
}
