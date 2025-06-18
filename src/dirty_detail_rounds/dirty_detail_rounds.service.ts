import { Injectable } from '@nestjs/common';
import { CreateDirtyDetailRoundDto } from './dto/create-dirty_detail_round.dto';
import { UpdateDirtyDetailRoundDto } from './dto/update-dirty_detail_round.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DirtyDetailRoundsService {
  constructor(private prisma: PrismaService) { }

  create(CreateDirtyDetailRoundDto: CreateDirtyDetailRoundDto) {
    return this.prisma.dirty_detail_rounds.create({
      data: CreateDirtyDetailRoundDto
    });
  }

  // findAll() {
  //   return this.prisma.dirty_detail_rounds.findMany();
  // }

  async findAll(dirty_detail_id?: number) {
    const where = dirty_detail_id ? { dirty_detail_id } : {};

    const details = await this.prisma.dirty_detail_rounds.findMany({
      where,
      orderBy: { id: 'desc' },
    });

    return details;
  }

  findOne(id: number) {
    return this.prisma.dirty_detail_rounds.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateDirtyDetailRoundDto) {
    return this.prisma.dirty_detail_rounds.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.dirty_detail_rounds.delete({ where: { id } });
  }
}
