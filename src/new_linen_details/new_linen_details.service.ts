import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNewLinenDetailDto } from './dto/create-new_linen_detail.dto';
import { UpdateNewLinenDetailDto } from './dto/update-new_linen_detail.dto';

@Injectable()
export class NewLinenDetailsService {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreateNewLinenDetailDto) {
    return this.prisma.new_linen_details.create({
      data: dto,
    });
  }

  async findAll(new_linen_id?: number) {
    const where = new_linen_id ? { new_linen_id } : {};
    return this.prisma.new_linen_details.findMany({
      where,
      orderBy: { id: 'desc' },
    });
  }

  async findOne(id: number) {
    const detail = await this.prisma.new_linen_details.findUnique({
      where: { id },
    });
    if (!detail) throw new NotFoundException(`Detail ID ${id} not found`);
    return detail;
  }

  async update(id: number, dto: UpdateNewLinenDetailDto) {
    await this.findOne(id); // ตรวจสอบก่อน
    return this.prisma.new_linen_details.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.new_linen_details.delete({
      where: { id },
    });
  }
}
