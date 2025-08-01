import { Injectable } from '@nestjs/common';
import { CreateMaterialTypeDto } from './dto/create-material_type.dto';
import { UpdateMaterialTypeDto } from './dto/update-material_type.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MaterialTypesService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createMaterialTypeDto: CreateMaterialTypeDto) {
    return this.prisma.material_types.create({
      data: createMaterialTypeDto,
    });
  }

  async findAll() {
    const materialTypes = await this.prisma.material_types.findMany({
      orderBy: { id: 'asc' },
    });
    return { data: materialTypes };
  }

  async findAllMaterialTypesPagination(

    {
      page = 1,
      pageSize = 10,
      search = ''
    }:
      {
        page?: number;
        pageSize?: number;
        search?: string;
      }
  ) {
    const skip = (page - 1) * pageSize;
    const where: any = {};
    if (search) {
      where.OR = [
        { name_th: { contains: search } },
        { name_en: { contains: search } },
        { description: { contains: search } },
      ];
    }

    const total = await this.prisma.material_types.count({
      where,
    });

    const data = await this.prisma.material_types.findMany({
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
    const materialType = await this.prisma.material_types.findUnique({
      where: { id },
      include: {
        materials: true,
      },
    });
    return materialType;
  }

  async update(id: number, updateMaterialTypeDto: UpdateMaterialTypeDto) {
    const materialType = await this.prisma.material_types.update({
      where: { id },
      data: updateMaterialTypeDto,
    });
    return materialType;
  }

  async remove(id: number) {
    const materialType = await this.prisma.material_types.delete({
      where: { id },
    });
    return materialType;
  }
}
