import { Injectable } from '@nestjs/common';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MaterialsService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createMaterialDto: CreateMaterialDto) {
    return this.prisma.materials.create({
      data: createMaterialDto,
      include: {
        material_types: true,
        sap_sale: true,
      },
    });
  }

  async findAll() {
    const materials = await this.prisma.materials.findMany({
      include: {
        material_types: true,
        sap_sale: true,
      },
      orderBy: { id: 'asc' },
    });
    return { data: materials };
  }

  async findAllMaterialsPagination(
    {
      page = 1,
      pageSize = 10,
      material_type_id = '',
      sap_sale_id = '',
      search = ''
    }:
      {
        page?: number;
        pageSize?: number;
        material_type_id?: string;
        sap_sale_id?: string;
        search?: string;
      }
  ) {
    const skip = (page - 1) * pageSize;

    const where: any = {};

    if (material_type_id) {
      where.material_type_id = parseInt(material_type_id);
    }

    if (sap_sale_id) {
      where.sap_sale_id = parseInt(sap_sale_id);
    }

    if (search) {
      where.OR = [
        { material_code: { contains: search } },
        { material_name_th: { contains: search } },
        { material_name_en: { contains: search } },
        { description: { contains: search } },
      ];
    }

    const total = await this.prisma.materials.count({
      where,
    });

    const data = await this.prisma.materials.findMany({
      where,
      skip,
      take: pageSize,
      include: {
        material_types: true,
        sap_sale: true,
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
    const material = await this.prisma.materials.findUnique({
      where: { id },
      include: {
        material_types: true,
        sap_sale: true,
        items: true,
      },
    });
    return material;
  }

  async update(id: number, updateMaterialDto: UpdateMaterialDto) {
    const material = await this.prisma.materials.update({
      where: { id },
      data: updateMaterialDto,
      include: {
        material_types: true,
        sap_sale: true,
      },
    });
    return material;
  }

  async remove(id: number) {
    const material = await this.prisma.materials.delete({
      where: { id },
    });
    return material;
  }
}
