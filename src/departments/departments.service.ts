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
        sale_office: true,
      },
      orderBy: { id: 'desc' },
    });
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
