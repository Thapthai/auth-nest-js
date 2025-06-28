import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DepartmentsService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createDepartmentDto: CreateDepartmentDto) {
    return this.prisma.departments.create({
      data: createDepartmentDto,
    });
  }

  async findAll() {
    return this.prisma.departments.findMany({
      include: {
        sale_office: false,
      },
      orderBy: { id: 'desc' },
    });
  }


  async findAllBySaleOffice({ page, pageSize, keyword, saleOfficeId }: {
    page: number;
    pageSize: number;
    keyword: string;
    saleOfficeId?: number;
  }) {
    const skip = (page - 1) * pageSize;

    // นับจำนวนรวมก่อน (total)
    const total = await this.prisma.departments.count({
      where: {
        AND: [
          saleOfficeId ? { sale_office_id: saleOfficeId } : {},
          {
            OR: [
              { name_th: { contains: keyword } },
              { name_en: { contains: keyword } },
              { department_code: { contains: keyword } },
              { description: { contains: keyword } },
            ],
          },
        ],
      },
    });

    // ดึงข้อมูลแบบ paginate
    const items = await this.prisma.departments.findMany({
      where: {
        AND: [
          saleOfficeId ? { sale_office_id: saleOfficeId } : {},
          {
            OR: [
              { name_th: { contains: keyword } },
              { name_en: { contains: keyword } },
              { department_code: { contains: keyword } },
              { description: { contains: keyword } },
            ],
          },
        ],
      },
      skip,
      take: pageSize,
      orderBy: { id: 'asc' },
      select: {
        id: true,
        department_code: true,
        name_th: true,
        name_en: true,
        description: true,
        status: true,
        create_at: true,
        update_at: true,
      },
    });

    return { items, total };
  }


  async findOne(id: number) {
    const department = await this.prisma.departments.findUnique({
      where: { id },
    });
    if (!department) {
      throw new NotFoundException(`Department #${id} not found`);
    }
    return department;
  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    await this.findOne(id); // ตรวจสอบก่อนว่า department มีอยู่จริง
    return this.prisma.departments.update({
      where: { id },
      data: updateDepartmentDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // ตรวจสอบก่อนว่า department มีอยู่จริง
    return this.prisma.departments.delete({
      where: { id },
    });
  }
}
